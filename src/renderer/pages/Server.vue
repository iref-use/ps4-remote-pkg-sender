<template>
<div class="ServerView">

    <el-row style="margin-bottom: 20px">
        <el-button :type="$helper.is(tab == 'server', 'success active', '')" data-umami-event="tab.server" @click="$root.serverTab = 'server'"> Base Files </el-button>
        <el-button :type="$helper.is(tab == 'dragged', 'success active', '')" data-umami-event="tab.dragged"  @click="$root.serverTab = 'dragged'"> Dragged Files </el-button>
        <el-button disabled> Upcoming Feature Files from Hosts! </el-button>
    </el-row>

    <el-row style="margin-bottom: 20px;">
      <el-col :span="20" style="display: flex">
            <el-button @click="reload" size="small" icon="el-icon-refresh-left" style="margin-right: 10px; height: 32px;" v-if="tab == 'server'"> Reload </el-button>

            <el-form class="base_path_input_form" v-if="$root.serverTab == 'server'">
            <el-form-item style="margin: 0px; width: 100%;">
                <el-input size="small" placeholder="Select your base path of your PKG's" v-model="server.base_path" disabled>
                    <el-button size="mini" slot="append" icon="el-icon-edit" @click.native="enterManuallyBasePath"> </el-button>
                    <el-button size="mini" slot="append" icon="el-icon-folder" @click.native="selectBasePath"> </el-button>
                    <el-button size="mini" slot="append" icon="el-icon-plus" @click.native="addAllFilesToQueue"> Add all to Queue </el-button>
                </el-input>
            </el-form-item>            
            </el-form>

            <el-button size="small" icon="el-icon-delete" @click.native="removeFilesFromDragged" v-if="tab == 'dragged'"> Remove all files </el-button>
            <el-button size="small" icon="el-icon-plus" @click.native="addAllFilesToQueue" v-if="tab == 'dragged'"> Add all to Queue </el-button>
      </el-col>
      <el-col :span="4">
            <el-input v-model="search" size="small" placeholder="Search" prefix-icon="fas fa-search" />
      </el-col>
    </el-row>


    <el-table :data="files" v-loading="loading"
        element-loading-text="Loading Server files"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
              <el-tag size="small" type="info" style="margin-bottom: 3px;"> Path: {{ scope.row.path }} </el-tag> <br>
              <el-tag size="small" type="info"> URL: {{ scope.row.url }} </el-tag> <br>
              <pre v-if="false">{{ scope.row }}</pre>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="Name"></el-table-column>

        <el-table-column label="Ext" width="100" v-if="showExtension">
            <template slot-scope="scope">
                <el-tag size="mini"
                      :type="scope.row.ext === '.pkg' ? 'primary' : 'success'"
                      disable-transitions>{{scope.row.ext}}</el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="cusa" label="Title ID" width="110" align="center" v-if="showCUSA">
            <template slot-scope="scope">
                <small style="font-size:12px">{{ scope.row.cusa }}</small>
            </template>
        </el-table-column>

        <el-table-column prop="status" label="Status" width="120" align="center">
          <template slot-scope="scope">
              <el-tag size="small" plain :type="$helper.getFileStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="size" label="Size" width="120" align="right">
          <template slot-scope="scope">
              <el-tag size="small" plain :type="$helper.getFileSizeType(scope.row.size)">{{ scope.row.size }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Progress" width="100px" v-if="showPercentage">
            <template slot-scope="scope">
                <el-tag size="mini" v-if="0">n/a</el-tag>
                <el-progress :stroke-width="15" :percentage="scope.row.percentage" :text-inside="true" stroke-linecap="square"></el-progress>
            </template>
        </el-table-column>

        <el-table-column label="Operation" width="100" align="right">
            <template slot-scope="scope">
                <el-button circle size="small" icon="fa fa-minus" @click="removeFromQueue(scope.row)" v-if="scope.row.status == 'in queue'" />
                <el-button circle size="small" icon="el-icon-plus" @click="addToQueue(scope.row)" v-if="scope.row.status != 'in queue'" />
                <el-button circle size="small" icon="fa fa-cloud-download-alt" @click="check(scope.row.url)" v-if="tab == 'server'" />
                <el-button circle size="small" icon="el-icon-delete" @click="removeFileFromDragged(scope.row)" v-if="tab == 'dragged'" />
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
import { remote, ipcRenderer } from 'electron'

import express from 'express'
import http from 'http'

export default {
    name: 'ServerList',

    data(){ return {
        // files: [],
        debug: false,
        showExtension: false,
        showCUSA: true,
        showVersion: false,
        showPercentage: false,

        search: '',

        app: null,
        http: null,
    }},

    mounted(){
        // this.run()
        this.search = ''
    },

    computed: {
        server: sync('app/server'),
        draggedFiles: get('server/draggedFiles'),
        draggedServingFiles: get('server/draggedServingFiles'),
        serverFiles: get('server/serverFiles'),        
        servingFiles: get('server/servingFiles'),
        queueFiles: get('queue/queue'),
        routes: get('server/routes'),
        loading: get('server/loading'),
        files(){ 
            let search = this.search.toLowerCase()
            let finalFiles = this.servingFiles

            if( this.tab == 'dragged' )
                finalFiles = this.draggedServingFiles

            if(search.length != 0)
              return finalFiles.filter( file =>
                  file.name.toLowerCase().includes(search) || 
                  file.cusa.toLowerCase().includes(search) ||
                  file.status.toLowerCase().includes(search)
                )

            // legacy
            return finalFiles
        },
        tab(){
            return this.$root.serverTab
        },
    },

    methods: {
        reload(){
            if(!this.server.base_path){
                this.$message({
                  type: 'warning',
                  message: 'No server base path given. Please Configure first.'
                });
                return
            }

            console.log("Reload files at base path. Triggered though Server-List")
            // this.$store.dispatch('server/startLoading')
            // this.$store.dispatch('server/loadFiles', this.server.base_path)
            this.loadFiles()

            // this.$store.dispatch('server/stopLoading')
            // setTimeout( () => this.$store.dispatch('server/stopLoading'), 2000)
            // console.log(this.routes)
        },

        check(url){
            this.$root.openWithAutoclose(url)
        },

        run(){
            this.$store.dispatch('server/resetLogs')

            setInterval( () => {
                let x = this.servingFiles[0]
                console.log("run test", x)
                x.percentage++

                this.$store.dispatch('server/addLog', 'just a test')
            }, 1000)
        },

        addToQueue(file){
            let find = this.$store.getters['queue/isInQueueUnique'](file)

            if(!find){
                file.status = 'in queue'
                this.$store.dispatch('queue/addToQueue', file)
                this.$root.track({ name: 'addToQueue', data: { name: 'Added to Queue', value: file.name } })
            }
            else {
                if(file.status == 'serving')
                  file.status = 'in queue'

                this.$message({
                    message: file.name + ' is already in Queue',
                    type: 'warning'
                })
            }
        },

        removeFromQueue(file, notify=true){
            let servingFile = this.$store.getters['server/findFile'](file)

            if(servingFile && servingFile.status == 'in queue'){
                servingFile.status = 'serving'
                this.$store.dispatch('queue/removeFromQueue', file)
                this.$root.track({ name: 'removeFromQueue', data: { name: 'Removed from Queue', value: file.name } })
            }
            else {
                if( notify )
                    this.$message({
                        message: "Can't remove " + file.name + " from queue because it's in another state",
                        type: 'warning'
                    })
            }
        },

        addAllFilesToQueue(){
            this.files.map( file => {
                if( !this.$store.getters['queue/isInQueue'](file) )
                    this.addToQueue(file)
            })

            this.$message({
              type: 'success',
              message: 'All Files has been added to the Queue'
            });        
            this.$root.track({ name: 'addAllFilesToQueue', data: { name: 'Add all files to the Queue' } })    
        },

        enterManuallyBasePath(){
            this.$prompt('Please input base path', 'Base Path for the Server', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              // inputErrorMessage: 'Invalid Email'
            }).then(({ value }) => {
                if(value){
                    this.server.base_path = value
                    this.$message({
                      type: 'success',
                      message: 'Your base_path has been set to:' + value
                    });
                    this.loadFiles()
                }
            }).catch(() => {
                this.$message({
                  type: 'info',
                  message: 'Input canceled'
                });
            });
        },

        async selectBasePath(){
            let path = await remote.dialog.showOpenDialog({ properties: ['openDirectory'] })

            if( path && !path.canceled ){
                // console.log("Path changed in Server Tab.")
                this.server.base_path = path.filePaths[0]
                this.$store.dispatch('app/setServer', this.server)
                this.loadFiles()
            }
        },

        loadFiles(){
            this.$store.dispatch('server/loadFiles', this.server.base_path)
            
            this.$message({
                type: 'success',
              message: 'Files has been reloaded'
            });
            this.$root.track({ name: 'reload', data: { name: 'Reload Server files from base Path' } })
        },

        removeFilesFromDragged(){
            let leftFilesWithNoQueue = this.draggedServingFiles.filter( file => file.status != 'serving')
            this.$store.dispatch('server/setDraggedFiles', leftFilesWithNoQueue)

            this.$message({
                type: 'success',
              message: 'Not serving Files has been removed'
            });            
            this.$root.track({ name: 'removeFilesFromDragged', data: { name: 'Remove all dragged Items' } })
        },

        removeFileFromDragged(file){
            let fileInQueue = this.$store.getters['queue/isInQueue'](file)

            if( fileInQueue ){
                const h = this.$createElement
                return this.$msgbox({
                    title: "Remove File from List",
                    message: h('div', null, [
                        h('span', null, " "),
                        h('br', null),
                        h('b', null, file.name),
                        h('br', null),
                        h('span', null, 'is in the Queue'),
                        h('br', null),
                        h('span', null, 'Are you sure to remove the file?')
                    ]),
                    showCancelButton: true,
                })
                .then( _ => {
                    this.removeFileFromDraggedHandler(file)
                })
                .catch( _ => {})                                
            }

            this.removeFileFromDraggedHandler(file)
        },

        removeFileFromDraggedHandler(file){
            this.removeFromQueue(file, false)
            let cleaned = this.draggedServingFiles.filter( f => f.path != file.path )
            this.$store.dispatch('server/setDraggedFiles', cleaned)
            this.$root.track({ name: 'removeFileFromDraggedHandler', data: { name: 'Remove dragged File from List', value: file.name } })
        }

    }
}
</script>

<style lang="scss" scoped>
.path_input_tag {
  margin-right: 10px;
  max-width: 100%;
  overflow: hidden;
}

.base_path_input_form {
    width: 100%; 
    margin-right: 10px; 
    margin-bottom: 0px;
}

.base_path_input_form .el-form-item__content {
    line-height: 1;
}
</style>
