<template>
<div>

    <div style="display: flex; flex-direction: row;">
      <el-button @click="reload" size="mini" icon="el-icon-refresh-left" style="margin-right: 10px;"> Reload </el-button>
      <el-tag size="size" effect="light" style='margin-right: 10px'>{{ server.base_path }}</el-tag>
    </div>

    <el-table :data="files" style="width: 100%">
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

        <el-table-column label="Status" width="100px">
            <template slot-scope="scope">
                <el-tag size="mini" v-if="0">n/a</el-tag>
                <el-progress :stroke-width="15" :percentage="scope.row.percentage" :text-inside="true" stroke-linecap="square"></el-progress>
                {{ scope.row.stats }}
            </template>
        </el-table-column>

        <el-table-column label="Operation" width="100" align="right">
            <template slot-scope="scope">
                <el-button circle size="small" icon="el-icon-search" />

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

        app: null,
        http: null,
    }},

    mounted(){

    },

    computed: {
        server: get('app/server'),
        files: sync('server/serverFiles'),
    },

    methods: {
        reload(){
            this.$store.dispatch('server/loadFiles')
        }
    }
}
</script>

<style lang="css" scoped>
</style>
