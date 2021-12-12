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
import { shell } from 'electron'

import express from 'express'
import http from 'http'

import Logs from './components/Logs'
import Files from './components/Files'
import Debug from './components/Debug'

export default {
    name: 'Server',

    components: {
        Logs,
        Files,
        Debug,
    },

    data(){ return {
        tab: 'logs',
        host: {
            app: null,
            server: null
        }
    }},

    mounted(){
        this.$store.dispatch('server/resetLogs')
        this.loadBasePathFiles()
        this.createServer()
        this.startServer()
    },

    computed: {
        config: get('app'),
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

    methods: {
        loadBasePathFiles(){
            this.$store.dispatch('server/loadFiles', this.config.server.base_path)
        },

        createServer(){
            const app = express();
            // const server = http.createServer(app);

            this.host.app = app
            // this.host.server = server
        },

        restartServer(){
            this.stopServer()
            this.startServer()
        },

        async startServer(){
            this.host.server = await this.host.app.listen(this.port, () => {
                this.$store.dispatch('server/addLog', 'Server is running on port ' + this.ip + ' at port ' + this.port)
                this.$store.dispatch('server/setStatus', 'running')
                this.createPaths()
            })
            .on('error', () => {
                this.$store.dispatch('server/addLog', 'Error in listening on ' + this.ip + ' at port ' + this.port)
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

        createPaths(){
            console.log("::server | Creating hearthbeat")
            this.$store.dispatch('server/addLog', "Create Hearthbeat endpoint")
            this.host.app.get('/hb', function(request, response){
                response.status(200).json({
                    remoteAddress: request.connection.remoteAddress,
                    remotePort: request.connection.remotePort,
                    localAddress: request.connection.localAddress,
                    localPort: request.connection.localPort,
                    message: "Congratz. Hearthbeat is working"
                })
            })

            console.log("::server | reset serving files list ")
            let servingFiles = []

            console.log("::server | Loop though serverFiles (" + this.serverFiles.length + ")")
            this.$store.dispatch('server/addLog', "Loading (" + this.serverFiles.length + ") files at base path")

            this.serverFiles.map( file => {
                console.log("::server | create endpoint ", file.patchedFilename)
                this.host.app.get(`/${file.patchedFilename}`, function(request, response){
                    response.status(200).download(file.path, file.name)
                })
                file.url = 'http://' + this.ip + ':' + this.port + '/' + file.patchedFilename
                file.status = 'serving'
                servingFiles.push(file)
            })

            console.log("::server | update serving file list", servingFiles)
            this.$store.dispatch('server/addLog', "Serving " + servingFiles.length + " files")
            this.$store.dispatch('server/setServingFiles', servingFiles)
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
