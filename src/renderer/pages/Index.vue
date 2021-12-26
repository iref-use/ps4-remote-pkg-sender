<template>
<div>

  <el-row>
    <el-col :span="20">
        <el-button size="small" icon="el-icon-refresh-left" @click="resetAll"> Reset Queue, Tasks and Installed </el-button>
        <el-button size="small" icon="el-icon-refresh-left" @click="resetInstalled"> Reset Installed </el-button>
        <el-button size="small" icon="el-icon-refresh-left" @click="clearFinishedFiles" v-if="finishedFiles.length"> Clear finished </el-button>

        <el-button size="small" @click="checkps4"> check </el-button>
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
            <el-button size="mini" icon="fa fa-info" @click="info(scope.row)"> Info </el-button>
            <el-button size="mini" icon="fa fa-stop" @click="stop(scope.row)"> Stop </el-button>
            <el-button size="mini" icon="fa fa-trash" @click="remove(scope.row)"> Remove </el-button>
            <el-button size="mini" icon="fa fa-play" @click="resume(scope.row)"> Resume </el-button>
            <el-button size="mini" icon="fa fa-play" @click="start(scope.row)"> Start </el-button>

            <el-button circle size="small" icon="fa fa-play" v-if="scope.row.status != 'installing'" @click="start(scope.row)"> </el-button>
            <el-button circle size="small" icon="fa fa-pause" v-if="scope.row.status == 'installing'" @click="pause(scope.row)"> </el-button>

            <br>

            <pre> Percent: {{ scope.row.percentage }} | Status: {{ scope.row.status }} </pre>
            <pre> {{ scope.row.length }} | {{ scope.row.transferred }}</pre>
            <pre>{{ scope.row }}</pre>
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

      <el-table-column prop="task" label="Task" width="110" v-if="showTask"></el-table-column>
      <el-table-column prop="cusa" label="CUSA" width="100" v-if="showCUSA"></el-table-column>
      <el-table-column prop="cusa" label="CUSA" width="100" v-if="showVersion"></el-table-column>

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

      <el-table-column label="Operation" width="200" align="right">
          <template slot-scope="scope">
              <el-button circle size="small" icon="fa fa-info" @click="info(scope.row)"> </el-button>
              <el-button circle size="small" icon="fa fa-stop" @click="stop(scope.row)"> </el-button>
              <el-button circle size="small" icon="fa fa-play" v-if="scope.row.status != 'installing'" @click="start(scope.row)"> </el-button>
              <el-button circle size="small" icon="fa fa-pause" v-if="scope.row.status == 'installing'" @click="pause(scope.row)"> </el-button>

              <el-button circle size="small" icon="fab fa-playstation" @click="isInstalled(scope.row)" />

              <el-button circle size="small" icon="fa fa-check" v-if="scope.row.status == 'finished' && scope.row.status == 'serving' && scope.row.status == 'installing'" />
          </template>
      </el-table-column>
  </el-table>

  <mainComponents v-if="false" />

  <pre v-if="debugLogs">
    <el-button size="mini" @click="$store.dispatch('queue/setLogs', [])"> Clear Logs </el-button>
    {{ logs }}
  </pre>
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
      debugLogs: true,

      loading: false,
      showTask: true,
      showCUSA: false,
      showVersion: false,
      showPercentage: true,
      showExtension: false,
      ints: [],
      search: '',
  }},

  mounted(){
      this.search = ''
  },

  computed: {
      server: get('app/server'),
      queue: get('queue'),
      logs: get('queue/logs'),
      tasks: get('queue/tasks'),
      servingFiles: sync('server/servingFiles'),
      queueFiles: get('queue/queue'),
      installedFiles: sync('queue/installed'),
      ps4ip: get('app/getPS4IP'),
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
      checkps4(){
          this.$ps4.checkServer().then( ({ data }) => {
              this.$message({ message: data.message, type: 'success' })
          })
          .catch( e => {
              this.$mesage({ message: "Heartbeath not working", type: 'danger' })
          })
      },

      isInstalled(file){
          this.$ps4.isInstalled(file)
                  .then( ({ data }) => {
                      if(data.exists == true)
                        file.status = 'installed'

                      this.$message({ message: data.message, type: data.type })
                  })
                  .catch( e => console.log(e) )
      },

      start(file){
          if(file.task && ['pause', 'stop'].includes(file.status) ){
              console.log(file.name + ' found task id ' + file.task)
              return this.resume(file)
          }

          console.log(file.name + ' start installing')

          this.clearInterval(file)

          this.$ps4.install(file)
              .then( ({ data }) => {
                  this.log(data)

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

                      this.log(file.name + ' has been started installing')
                  }
                  else {
                      console.log(file.name, "Error on install", data)
                      // 2157510677 error on double install?
                      // 2157510663 already installed?
                      // 2157510681 task doesn't exist
                  }

              })
              .catch( e => console.log(e) )
      },

      stop(file){
          console.log(file.name + ' stop')

          this.clearInterval(file)
          this.setStatus(file, 'stop')

          this.$ps4.stop(file)
                  .then( ({ data }) => {
                      console.log("Stop ", data)
                  })
                  .catch( e => console.log(e) )

          this.log(file.name + ' stop')
      },

      pause(file){
          console.log(file.name + ' pause')

          this.clearInterval(file)
          this.setStatus(file, 'pause')

          this.$ps4.stop(file)
                  .then( ({ data }) => {
                      console.log("pause ", data)
                  })
                  .catch( e => console.log("Error to console " + e) )

          this.log(file.name + ' pause')
      },

      resume(file){
          console.log(file.name + ' continue task id ' + file.task)

          this.$ps4.resume(file)
                  .then( ({ data }) => {
                      if(data.status == 'success'){
                          console.log("resume ", data)
                          this.setStatus(file, 'installing')
                          this.startInterval(file)
                      }
                  })
                  .catch( e => console.log(e) )

          this.log(file.name + ' resume')
      },

      remove(file){
          console.log(file.name + ' remove ')

          this.$ps4.remove(file)
                .then( ({ data }) => {
                    console.log(data)
                })
                .catch( e => console.log(e) )
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

                          if(percent < 100){
                            file.percentage = percent
                          }
                          else {
                            console.log(file.name + " finished")
                            this.clearInterval(file)
                            file.percentage = 100
                            this.setStatus(file, 'finish')
                            this.fileInstalled(file, 'installed')

                            this.log(file.name + ' finished')
                          }

                          file.logs.push(data)
                      }
                      else {
                          console.log("Task Info Fail", data)
                      }

                  })
                  .catch( e => console.log(e) )

          // this.log(file.name + ' info')
      },

      find(file){
          this.$ps4.find(file)
                  .then( ({ data }) => {
                      console.log("find ", data)
                  })
                  .catch( e => console.log(e) )

          this.log(file.name + ' find')
      },

      startInterval(file){
          this.clearInterval(file)
          this.ints[file.patchedFilename] = setInterval( () => {
              // console.log(file.name + ' ' + file.percentage)
              this.info(file)
          }, 2000)
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

      log(a){
          this.$store.dispatch('queue/addLog', a)
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

      check(url){
          window.open(url)
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
          this.finishedFiles.map( file => this.$store.dispatch('queue/removeFromQueue', file))
      }

  }
}
</script>

<style lang="css" scoped>
</style>
