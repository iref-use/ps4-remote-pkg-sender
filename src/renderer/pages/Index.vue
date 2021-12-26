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

      <el-table-column prop="task" label="Task" width="100" v-if="showTask"></el-table-column>
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

      <el-table-column label="Operation" width="130" align="right">
          <template slot-scope="scope">
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
          if(file.task && file.status == 'pause'){
              console.log(file.name + ' found task id ' + file.task)
              return this.resume(file)
          }

          console.log(file.name + ' start installing')
          this.clearInterval(file)
          file.percentage = 0

          this.setTask(file, 1234)
          this.setStatus(file, 'installing')
          this.startInterval(file)

          this.log(file.name + ' has been started installing')
      },

      pause(file){
          console.log(file.name + ' pause')
          this.clearInterval(file)
          this.setStatus(file, 'pause')

          this.log(file.name + ' pause')
      },

      resume(file){
          console.log(file.name + ' continue task id ' + file.task)
          this.setStatus(file, 'installing')
          this.startInterval(file)

          this.log(file.name + ' resume')
      },

      startInterval(file){
          this.ints[file.patchedFilename] = setInterval( () => {
              // console.log(file.name + ' ' + file.percentage)
              let value = file.percentage + this.getRandomInt(65)

              if(value < 100){
                file.percentage = value
                // file.status = 'installing'
              }
              else {
                console.log(file.name + " finished")
                this.clearInterval(file)
                file.percentage = 100
                // file.status = 'finish'

                this.setStatus(file, 'finish')
                this.fileInstalled(file, 'installed')

                this.log(file.name + ' finished')
              }
          }, 1000)
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
