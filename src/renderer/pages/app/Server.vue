<template>
<div>
    <h2>Server Application </h2>

    {{ files.length }} files found <br>
    Server is {{ running }} on {{ ip }}:{{ port }}<br>
    <br>
    <el-button size="mini" @click="open(hb)"> check hearthbeat </el-button> {{ hb }} <br>
    <br>
    <el-button size="mini" @click="startServer">Start Server </el-button>
    <el-button size="mini" @click="stopServer"> Stop Server </el-button>
    <el-button size="mini" @click="restartServer"> Restart Server </el-button>
</div>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { get, sync } from 'vuex-pathify'
import { shell } from 'electron'

import express from 'express'
import http from 'http'

export default {
    name: 'Server',

    data(){ return {
        host: {
            app: null,
            server: null
        }
    }},

    mounted(){
        this.loadBasePathFiles()
        this.createServer()
        this.createPaths()
        this.startServer()
    },

    computed: {
        config: get('app'),
        ip: get('app/server.ip'),
        port: get('app/server.port'),
        files: sync('server/serverFiles'),
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
                console.log('Server is running on port ' + this.ip + ' at port ' + this.port)
                this.$store.dispatch('server/setStatus', 'running')
            })
            .on('error', () => {
                console.log('Error in listening on ' + this.ip + ' at port ' + this.port)
                this.$store.dispatch('server/setStatus', 'error')
            })
        },

        async stopServer(){
            console.log("Closing server")
            await this.host.server.close(() => {
                console.log("Server closed")
                this.$store.dispatch('server/setStatus', 'stopped')
            })
        },

        createPaths(){
            console.log("Creating hearthbeat")
            this.host.app.get('/hb', function(request, response){
                response.status(200).json({
                    remoteAddress: request.connection.remoteAddress,
                    remotePort: request.connection.remotePort,
                    localAddress: request.connection.localAddress,
                    localPort: request.connection.localPort,
                    message: "Congratz. Hearthbeat is working"
                })
            })
        },

        open(path){
            window.open(path)
        },

    }
}
</script>

<style lang="css" scoped>
</style>
