<template>
<div>

    <div style="display: flex; flex-direction: row;">
      <el-button @click="reload" size="mini" icon="el-icon-refresh-left" style="margin-right: 10px;"> Reload </el-button>
      <el-tag size="size" effect="light" style='margin-right: 10px'>{{ server.base_path }}</el-tag>
    </div>

    <el-table :data="servingFiles" v-loading="loading"
        element-loading-text="Loading Server files"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%">
        <el-table-column prop="name" label="Name"></el-table-column>

        <el-table-column label="Ext" width="100" v-if="showExtension">
            <template slot-scope="scope">
                <el-tag size="mini"
                      :type="scope.row.ext === '.pkg' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.ext}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="cusa" label="CUSA" width="100" v-if="showCUSA"></el-table-column>
        <el-table-column prop="cusa" label="CUSA" width="100" v-if="showVersion"></el-table-column>

        <el-table-column prop="status" label="Status" width="100" />

        <el-table-column prop="size" label="Size" width="120px" align="right" />

        <el-table-column label="Progress" width="100px" v-if="showPercentage">
            <template slot-scope="scope">
                <el-tag size="mini" v-if="0">n/a</el-tag>
                <el-progress :stroke-width="15" :percentage="scope.row.percentage" :text-inside="true" stroke-linecap="square"></el-progress>
            </template>
        </el-table-column>

        <el-table-column label="Operation" width="100" align="right">
            <template slot-scope="scope">
                <el-button circle size="small" icon="el-icon-search" @click="check(scope.row.url)" />

                <el-button circle size="small" icon="el-icon-caret-right" v-if="scope.row.status == 'init'"/>
                <el-button circle size="small" icon="el-icon-video-play" v-if="scope.row.status == 'pause'"/>
                <el-button circle size="small" icon="el-icon-video-pause" v-if="scope.row.status == 'play'"/>

                <el-button circle size="small" icon="el-icon-delete" v-if="scope.row.status == 'finished'" />
            </template>
        </el-table-column>
    </el-table>

    <template class='file_list' v-if="debug">
        <pre>{{ server.base_path }}</pre>
        <pre>{{ files }}</pre>
    </template>

</div>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { get, sync } from 'vuex-pathify'

import express from 'express'
import http from 'http'

export default {
    name: 'ServerList',

    data(){ return {
        // files: [],
        debug: false,
        showExtension: false,
        showCUSA: false,
        showVersion: false,
        showPercentage: false,

        app: null,
        http: null,
    }},

    mounted(){
        // this.run()
    },

    computed: {
        server: get('app/server'),
        serverFiles: get('server/serverFiles'),
        servingFiles: sync('server/servingFiles'),
        routes: get('server/routes'),
        loading: get('server/loading'),
        files(){ return this.servingFiles },
    },

    methods: {
        reload(){
            console.log("Reload files at base path. Triggered though Server-List")
            // this.$store.dispatch('server/startLoading')
            this.$store.dispatch('server/loadFiles', this.server.base_path)
            // this.$store.dispatch('server/stopLoading')
            // setTimeout( () => this.$store.dispatch('server/stopLoading'), 2000)
            // console.log(this.routes)
        },

        check(url){
            window.open(url)
        },

        run(){
            this.$store.dispatch('server/resetLogs')

            setInterval( () => {
                let x = this.servingFiles[0]
                console.log("run test", x)
                x.percentage++

                this.$store.dispatch('server/addLog', 'just a test')
            }, 1000)
        }

    }
}
</script>

<style lang="css" scoped>
</style>
