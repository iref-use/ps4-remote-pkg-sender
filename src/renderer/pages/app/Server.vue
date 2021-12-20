<template>
<div>
    <h2>Server Application </h2>

    <el-tabs v-model="tab">
      <el-tab-pane label="Log" name="logs">
          <Logs />
      </el-tab-pane>
      <el-tab-pane label="Serving Files" name="files">
          <Files />
      </el-tab-pane>
      <el-tab-pane label="Routes" name="routes">
          <Routes />
      </el-tab-pane>
      <el-tab-pane label="Debug" name="debug">
          <Debug @startServer="startServer" @stopServer="stopServer" @restartServer="restartServer" @hearthbeat="checkHeathbeat" />
      </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { get, sync } from 'vuex-pathify'
import { shell, ipcRenderer } from 'electron'

import express from 'express'
import http from 'http'

import Logs from './components/Logs'
import Files from './components/Files'
import Debug from './components/Debug'
import Routes from './components/Routes'

export default {
    name: 'Server',

    components: {
        Logs,
        Files,
        Debug,
        Routes,
    },

    data(){ return {
        tab: 'logs',
        run: false,
        host: {
            app: null,
            server: null,
            router: null,
        }
    }},

    mounted(){
        this.registerChannel()

        this.$store.dispatch('server/resetLogs')
        this.$store.dispatch('server/setServerFiles', [])

        this.loadBasePathFiles()
        this.createServer()
        this.startServer()
    },

    computed: {
        config: get('app'),
        base_path: get('app/server.base_path'),
        ip: get('app/server.ip'),
        port: get('app/server.port'),
        serverFiles: get('server/serverFiles'),
        servingFiles: get('server/servingFiles'),
        running: sync('server/status'),
        app: get('server/app'),
        hb(){
            return 'http://' + this.ip + ':' + this.port + '/hb'
        }
    },

    watch: {
        // 'base_path'(){
        //     this.addFilesFromBasePath()
        // },
        'serverFiles'(){
            if(!this.run){
                this.run = true
                return
            }
            this.$store.dispatch('server/addLog', "Server base path has been changed. Reload files.")
            this.createPaths()
        },
    },

    methods: {
        registerChannel(){
            ipcRenderer.on('server', (event, data) => {
                console.log("ipc channel | server ", data)
                if(data == 'refresh')
                  this.restartServer()

                if(data == 'toggle'){
                    if(this.running)
                      this.stopServer()
                    else
                      this.startServer()
                }
            })
        },

        loadBasePathFiles(){
            if(this.config.server.auto_scan_on_startup)
              this.$store.dispatch('server/loadFiles', this.config.server.base_path)
        },

        createServer(){
            const app = express();
            // const server = http.createServer(app);

            this.host.app = app
            this.host.router = express.Router()
            // this.host.server = server
            this.$store.dispatch('server/addLog', "Created Server and Router")
        },

        restartServer(){
            this.stopServer()
            this.startServer()
        },

        async startServer(){
            this.host.server = await this.host.app.listen(this.port, () => {
                this.$store.dispatch('server/addLog', 'Server is running on port ' + this.ip + ' at port ' + this.port)
                this.$store.dispatch('server/setStatus', 'running')
                this.addRouterMiddleware()
                this.createPaths()
            })
            .on('error', (e) => {
                // console.log({ ...e })
                if(e.errno === 'EADDRINUSE')
                  this.$store.dispatch('server/addLog', "Port " + this.port + " is already in use. Choose another one and restart the Server")
                else
                  this.$store.dispatch('server/addLog', 'Error in listening on ' + this.ip + ' at port ' + this.port + ". Error: " + e.errno)

                this.$store.dispatch('server/setStatus', 'error')
            })
        },

        async stopServer(){
            let log = 'Closing Server'
            this.$store.dispatch('server/addLog', log)

            await this.host.server.close(() => {
                this.$store.dispatch('server/addLog', 'Server closed')
                this.$store.dispatch('server/setStatus', 'stopped')
            })
        },

        addRouterMiddleware(){
            this.host.app.use((req, res, next) => {
                this.host.router(req, res, next)
            })
        },

        createPaths(){
            this.host.router = new express.Router()
            this.$store.dispatch('server/setRoutes', [])
            this.addHearthbeatEndpoint()
            this.addFilesFromBasePath()
        },

        getRegisteredRoutes(){
            return this.host.router.stack.filter(r => r.route).map(r => r.route.path)
        },

        addHearthbeatEndpoint(){
            this.$store.dispatch('server/addLog', "Create Hearthbeat endpoint")
            this.host.router.get('/hb', function(request, response){
                response.status(200).json({
                    remoteAddress: request.connection.remoteAddress,
                    remotePort: request.connection.remotePort,
                    localAddress: request.connection.localAddress,
                    localPort: request.connection.localPort,
                    message: "Congratz. Hearthbeat is working"
                })
            })
        },

        addFilesFromBasePath(){
            this.$store.dispatch('server/addLog', "Reset serving files list")
            let servingFiles = []

            this.$store.dispatch('server/addLog', "Found " + this.serverFiles.length + " files at base path")

            this.serverFiles.map( file => {
                servingFiles.push(this.addFileEndpoint(file))
            })

            this.$store.dispatch('server/addLog', "Serving " + servingFiles.length + " files from base path")
            this.$store.dispatch('server/setServingFiles', servingFiles)
            this.$store.dispatch('server/setRoutes', this.getRegisteredRoutes())
        },

        addFileEndpoint(file){
            // this.$store.dispatch('server/addLog', "Create endpoint " + file.patchedFilename)
            this.host.router.get(`/${file.patchedFilename}`, function(request, response){
                response.status(200).download(file.path, file.name)
            })

            file.url = 'http://' + this.ip + ':' + this.port + '/' + file.patchedFilename
            file.status = 'serving'

            return file
        },

        checkHeathbeat(){
            this.open(this.hb)
        },

        open(path){
            window.open(path)
        },

    }
}
</script>

<style lang="css" scoped>
</style>
