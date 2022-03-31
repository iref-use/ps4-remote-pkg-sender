<template>
<div>

  <el-row>
    <el-col :span="20">
        <el-button size="small" icon="el-icon-refresh-left" @click="resetAll"> Reset Queue, Tasks and Installed </el-button>
        <el-button size="small" icon="el-icon-refresh-left" @click="resetInstalled"> Reset Installed </el-button>
        <el-button size="small" icon="el-icon-refresh-left" @click="clearFinishedFiles" v-if="finishedFiles.length"> Clear finished </el-button>

        <el-button size="small" icon="fa fa-server" @click="checkHB"> check Server </el-button>
        <el-button size="small" icon="fab fa-playstation" @click="checkPS4"> check PS4 </el-button>
        <el-button size="small" icon="el-icon-link" @click="openAddFileDialog" v-if="app.config.enableExternalLinks"> Add URL </el-button>
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
            <el-button size="mini" icon="fa fa-search" @click="find(scope.row)"> Find </el-button>
            <el-button size="mini" icon="fa fa-info" @click="info(scope.row)" :disabled="!scope.row.task"> Info </el-button>
            <el-divider direction="vertical" />
            <el-button size="mini" icon="fa fa-trash" @click="remove(scope.row)" :disabled="!scope.row.task"> Remove </el-button>
            <el-button size="mini" icon="fa fa-stop" @click="stop(scope.row)" :disabled="!scope.row.task"> Stop </el-button>
            <el-button size="mini" icon="fa fa-pause" @click="pause(scope.row)" :disabled="!scope.row.task"> Pause </el-button>
            <el-button size="mini" icon="fa fa-play" @click="resume(scope.row)" :disabled="!scope.row.task"> Resume </el-button>
            <el-button size="mini" icon="fa fa-play" @click="start(scope.row)"> Start </el-button>
            <el-divider direction="vertical" />
            <el-button size="mini" icon="fa fa-eye" @click="toggleFileObject(scope.row)" v-if="false"> File Object </el-button>
            <el-button size="mini" icon="fa fa-eye" @click="toggleFileLogs(scope.row)" v-if="false"> File Logs </el-button>

            <div style='height: 10px' />

            <el-tag size="small"> Percent: {{ scope.row.percentage }}  </el-tag>
            <el-tag size="small" :type="$helper.getFileStatus(scope.row.status)"> Status: {{ scope.row.status }} </el-tag>
            <el-tag size="small" type="info" v-if="scope.row.cusa"> {{ scope.row.cusa }} </el-tag>
            <el-tag size="small" :type="$helper.getFileSizeType(scope.row.size)"> {{ scope.row.size }} </el-tag>
            <el-tag size="small" type="info"> Task: {{ scope.row.task ? scope.row.task : '-' }} </el-tag>
            <el-tag size="small" type="info"> Logs: {{ scope.row.logs.length }} </el-tag>

            <el-divider direction="vertical" v-if="false" />
            <el-tag size="small" type="info" v-if="false"> Show File Object </el-tag>
            <el-tag size="small" type="info" v-if="false"> Show File Logs </el-tag>

            <div style='height: 10px' />

            <el-tag size="small" type="info" style="margin-bottom: 5px"> File Name: {{ scope.row.name }} </el-tag> <br>
            <el-tag size="small" type="info" style="margin-bottom: 5px"> Patched Name: {{ scope.row.patchedFilename }} </el-tag> <br>
            <el-tag size="small" type="info" style="margin-bottom: 5px"> URL: {{ scope.row.url }} </el-tag> <br>


            <pre v-if="showDebugInRow">{{ scope.row }}</pre>
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

      <el-table-column prop="task" label="Task" width="105" v-if="showTask"></el-table-column>
      <el-table-column prop="cusa" label="CUSA" width="100" v-if="showCUSA"></el-table-column>
      <el-table-column prop="cusa" label="Version" width="100" v-if="showVersion"></el-table-column>

      <el-table-column prop="rest" label="Rest" width="150" align="center">
        <template slot-scope="scope">
            <el-tag size="small" plain v-if="scope.row.rest && scope.row.rest != 0"> {{ $helper.secondsToString(scope.row.rest) }} </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="Status" width="120" align="center">
        <template slot-scope="scope">
            <el-tag size="small" plain :type="$helper.getFileStatus(scope.row.status)"> <i class="el-icon-loading" v-if="scope.row.status == 'installing'" /> {{ scope.row.status }} </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="size" label="Size" width="120" align="right">
        <template slot-scope="scope">
            <el-tag size="small" plain :type="$helper.getFileSizeType(scope.row.size)">{{ scope.row.size }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Progress" width="100px" v-if="showPercentage">
          <template slot-scope="scope">
              <el-progress :stroke-width="25" :percentage="scope.row.percentage" :text-inside="true" stroke-linecap="square"></el-progress>
          </template>
      </el-table-column>

      <el-table-column label="Operation" width="150" align="right">
          <template slot-scope="scope">
              <el-button circle size="small" icon="fa fa-minus" @click="removeFromQueue(scope.row)" />

              <el-button circle size="small" icon="fa fa-info" @click="info(scope.row)" v-if="false"> </el-button>
              <el-button circle size="small" icon="fa fa-stop" @click="stop(scope.row)" v-if="false"> </el-button>
              <el-button circle size="small" icon="fa fa-play" v-if="scope.row.status != 'installing'" @click="start(scope.row)"> </el-button>
              <el-button circle size="small" icon="fa fa-pause" v-if="scope.row.status == 'installing'" @click="pause(scope.row)"> </el-button>

              <el-button circle size="small" icon="fab fa-playstation" @click="isInstalled(scope.row)" />

              <el-button circle size="small" icon="fa fa-check" v-if="scope.row.status == 'finished' && scope.row.status == 'serving' && scope.row.status == 'installing'" />
          </template>
      </el-table-column>
  </el-table>

  <AddFileByURLDialog ref="AddFileByURLDialog"/>
  <mainComponents v-if="false" />

  <pre v-if="debug">{{ queue }}</pre>
</div>
</template>

<script>
import { get, sync } from 'vuex-pathify'
import JSON5 from 'json5'

export default {
  name: 'Index',

  data(){ return {
      debug: false,

      loading: false,
      showTask: true,
      showCUSA: false,
      showVersion: false,
      showPercentage: true,
      showExtension: false,
      showDebugInRow: true,
      ints: [],
      search: '',
  }},

  mounted(){
      this.search = ''
  },

  computed: {
      app: get('app'),
      server: get('app/server'),
      queue: get('queue'),
      logs: get('queue/logs'),
      tasks: get('queue/tasks'),
      servingFiles: sync('server/servingFiles'),
      queueFiles: get('queue/queue'),
      installedFiles: sync('queue/installed'),
      ps4ip: get('app/getPS4IP'),
      updateInterval: get('app/ps4.update'),
      files(){ 
          let search = this.search.toLowerCase()

          if(search.length != 0)
            return this.queueFiles.filter( file =>
                file.name.toLowerCase().includes(search) || 
                file.cusa.toLowerCase().includes(search) ||
                file.status.toLowerCase().includes(search)
              )

          return this.queueFiles
      },
      finishedFiles(){
          return this.queueFiles.filter( file => file.status == 'finish' )
      }
  },

  methods: {
      checkHB(){
          this.$ps4.checkServer().then( ({ data }) => {
              this.$message({ message: data.message, type: 'success' })
          })
          .catch( e => {
              this.$message({ message: "No Heartbeat. Server is not working, please check the Server Logs.", type: 'error' })
          })
      },

      checkPS4(){
          this.$ps4.checkPS4().then( (res) => {
              this.log("PS4 is accessible", { status: res.status, statusText: res.statusText })
              this.$message({ message: "Check Playstation: PS4 is accessible", type: 'success' })
          })
          .catch( e => {
              this.log("Check Playstation: PS4 is not accessible", e)
              // this.$message({ message: "PS4 is not accessible.", type: 'error' })
          })
      },

      isInstalled(file){
          this.$ps4.isInstalled(file)
                  .then( ({ data }) => {
                      if(data.exists == true)
                        file.status = 'installed'

                      let { exists, size, type } = data
                      this.log(data.message, { exists, size, type })
                      this.$message({ message: data.message, type: data.type })
                  })
                  .catch( e => {
                      this.clearInterval(file)
                      console.log(e)
                  })
      },

      start(file){
          if(file.task && ['pause', 'stop'].includes(file.status) ){
              console.log(file.name + ' found task id ' + file.task)
              return this.resume(file)
          }

          this.log(file.name + ' prepare start installing', file)

          this.clearInterval(file)

          this.log("install request", { type : 'direct', packages: [file.url] })
          
          this.$ps4.install(file)
              .then( ({ data }) => {
                  this.log(file.name + ' install', data)

                  let example =   {
                    "status": "success",
                    "task_id": 268435806,
                    "title": "Tin & Kuna"
                  }

                  if( data.status == 'success'){
                      this.$store.dispatch('queue/addTask', data)

                      this.setTask(file, data.task_id)
                      this.setStatus(file, 'installing')
                      this.startInterval(file)

                      this.log(file.name + ' has been started installing with Task ID ' + data.task_id, data)
                  }
                  else {
                      console.log(file.name + " error on install", data)
                      this.log(file.name + " error on install", data)
                      // 2157510677 error on double install?
                      // 2157510663 already installed?
                      // 2157510681 task doesn't exist
                  }

              })
              .catch( e => {
                  this.clearInterval(file)
                  console.log(e)
              })
      },

      stop(file){
          console.log(file.name + ' stop')

          this.clearInterval(file)

          this.$ps4.stop(file)
                  .then( ({ data }) => {
                      console.log("Stop ", data)
                      this.setStatus(file, 'stop')
                      this.log(file.name + ' stop Task ID ' + file.task, data)
                  })
                  .catch( e => {
                      this.clearInterval(file)
                      console.log(e)
                  })
      },

      pause(file){
          console.log(file.name + ' pause')

          this.clearInterval(file)

          this.$ps4.stop(file)
                  .then( ({ data }) => {
                      console.log("pause ", data)
                      this.setStatus(file, 'pause')
                      this.log(file.name + ' pause', data)
                  })
                  .catch( e => {
                      this.clearInterval(file)
                      console.log(e)
                  })
      },

      resume(file){
          console.log(file.name + ' continue task id ' + file.task)

          this.clearInterval(file)

          this.$ps4.resume(file)
                  .then( ({ data }) => {
                      if(data.status == 'success'){
                          console.log("resume ", data)
                          this.setStatus(file, 'installing')
                          this.startInterval(file)

                          this.log(file.name + ' resume Task ID ' + file.task, data)
                      }
                  })
                  .catch( e => {
                      this.clearInterval(file)
                      console.log(e)
                  })
      },

      remove(file){
          console.log(file.name + ' remove ')

          this.clearInterval(file)

          this.$ps4.remove(file)
                .then( ({ data }) => {
                    console.log(data)
                    this.log(file.name + ' remove', data)
                })
                .catch( e => {
                    this.clearInterval(file)
                    console.log(e)
                })
      },

      info(file){
          this.$ps4.getTask(file)
                  .then( ({ data }) => {
                      console.log(file.name + " get task info ", data)

                      let example = {
                        "status": "success",
                        "bits": 394,
                        "error": 0,
                        "length": 2667446272,
                        "transferred": 236060672,
                        "length_total": 2667446272,
                        "transferred_total": 236060672,
                        "num_index": 1,
                        "num_total": 1,
                        "rest_sec": 1116,
                        "rest_sec_total": 1116,
                        "preparing_percent": 100,
                        "local_copy_percent": 0
                      }

                      if(data.status && data.status == 'success'){
                          let length = Math.round(parseInt(data.length))
                          let done   = Math.round(parseInt(data.transferred))
                          let onePercent = 100 / length
                          let percent = Math.round(done * onePercent)
                          // console.log("percent", length, done, onePercent, percent)
                          let isWorking = data.length != data.transferred
                          let haveRestTime = data.rest_sec_total != 0

                          // check if we are in prepare state
                          if(data.preparing_percent != 100 && data.local_copy_percent != 100 && data.transferred == 0 && data.length == 0){
                            this.log(file.name + ' ps4 is still preparing ' + data.preparing_percent + '%', data)
                            return
                          }

                          if(data.length == 0 && data.transferred == 0){
                            this.log(file.name + ' ps4 prepared but still doing some work', data)
                            return
                          }

                          if(isWorking && percent < 100 && haveRestTime){
                            file.percentage = percent
                            file.rest = data.rest_sec_total
                            this.log(file.name + ' info', data)
                          }
                          else {
                            this.clearInterval(file)
                            file.percentage = 100
                            file.rest = 0
                            this.setStatus(file, 'finish')
                            this.fileInstalled(file, 'installed')

                            this.log(file.name + ' finished', data)
                          }

                          file.logs.unshift(data)
                      }
                      else {
                          console.log("Task Info Fail", data)
                          this.log(file.name + ' Info fail', data)
                          this.clearInterval(file)
                      }

                  })
                  .catch( e => {
                      this.clearInterval(file)
                      console.log(e)
                  })

          // this.log(file.name + ' info')
      },

      find(file){
          this.$ps4.find(file)
                  .then( ({ data }) => {
                      this.log(file.name + ' find', data)
                  })
                  .catch( e => {
                      this.clearInterval(file)
                      console.log(e)
                  })
      },

      startInterval(file){
          this.clearInterval(file)
          this.ints[file.patchedFilename] = setInterval( () => {
              // console.log(file.name + ' ' + file.percentage)
              this.info(file)
          }, this.updateInterval)
      },

      haveInterval(file){
          if(this.ints[file.patchedFilename])
            return this.ints[file.patchedFilename]

          return false
      },

      clearInterval(file){
          clearInterval(this.ints[file.patchedFilename])
      },

      setStatus(file, status){
          this.$store.dispatch('queue/status', { file, status })
      },

      setTask(file, id){
          this.$store.dispatch('queue/task', { file, id })
      },

      log(msg='', data={}, type='log'){
          // this.$store.dispatch('queue/addLog', a)
          this.$root.sendPS4({ time: Date.now(), msg, data, type })
      },

      fileInstalled(file, status='installed'){
          let servingFile = this.$store.getters['server/findFile'](file)
          if(servingFile){
            servingFile.status = status
          }

          this.setTask(file, '')
          this.$store.dispatch('queue/installed', file)
      },

      getRandomInt(max) {
          return Math.floor(Math.random() * max);
      },

      resetAll(){
          this.$confirm('This will clear your Queue, Tasks and Installed states.', 'Reset Queue, Tasks and Installed',
                {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                  type: 'warning',
                  center: true,
                })
                .then(() => {
                    this.ints.map( i => clearInterval(i) )
                    this.servingFiles.map( file => file.status = 'serving')

                    this.$store.dispatch('queue/resetAll')
                    this.$message({
                      type: 'success',
                      message: 'Queue, Tasks and Installed state has been resetted'
                    });
                })
                .catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: 'Reset action canceled'
                    // });
                });
      },

      resetInstalled(){
          this.servingFiles
                .filter( file => file.status == 'installed')
                .map( file => file.status = 'serving')
          this.$store.dispatch('queue/setInstalled', [])
      },

      clearFinishedFiles(){
          this.finishedFiles.map( file => this.removeFromQueue(file))
      },

      removeFromQueue(file){
          this.clearInterval(file)
          let servingFile = this.$store.getters['server/findFile'](file)

          if(servingFile && servingFile.status == 'in queue'){
              servingFile.status = 'serving'
          }

          if(file.task){
              this.stop(file)
          }

          this.$store.dispatch('queue/removeFromQueue', file)
      },

      openAddFileDialog(){
          console.log(this.$refs)
          this.$refs.AddFileByURLDialog.show = true
      },

  }
}
</script>

<style lang="css" scoped>
</style>
