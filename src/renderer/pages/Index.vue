<template>
<div>

  <el-row>
    <el-col :span="20">
        <el-button size="small" icon="el-icon-refresh-left" @click="$store.dispatch('queue/reset')"> Reset Queue and Tasks </el-button>
    </el-col>
    <el-col :span="0">

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

      <el-table-column prop="status" label="Status" width="120" align="center">
        <template slot-scope="scope">
            <el-button size="mini" plain
                :type="getStatusType(scope.row.status)"
                :loading="scope.row.status == 'installing'">{{ scope.row.status }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="size" label="Size" width="120px" align="right" />

      <el-table-column label="Progress" width="100px" v-if="showPercentage">
          <template slot-scope="scope">
              <el-tag size="mini" v-if="0">n/a</el-tag>
              <el-progress :stroke-width="25" :percentage="scope.row.percentage" :text-inside="true" stroke-linecap="square"></el-progress>
          </template>
      </el-table-column>

      <el-table-column label="Operation" width="130" align="right">
          <template slot-scope="scope">
              <el-button circle size="small" icon="el-icon-caret-right" @click="run(scope.$index)" v-if="false" />

              <el-button circle size="small" icon="fa fa-play" v-if="scope.row.status != 'installing'" @click="run(scope.$index)"> </el-button>
              <el-button circle size="small" icon="fa fa-pause" v-if="scope.row.status == 'installing'" @click="stop(scope.$index)"> </el-button>

              <el-button circle size="small" icon="el-icon-search" @click="check(scope.row.url)" />

              <el-button circle size="small" icon="fa fa-check" v-if="scope.row.status == 'finished' && scope.row.status == 'serving' && scope.row.status == 'installing'" />
          </template>
      </el-table-column>
  </el-table>

  <Queue />

  <Tasks />

  <mainComponents v-if="false" />

  <pre>{{ queue }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Index',

  data(){ return {
      loading: false,
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
      servingFiles: get('server/servingFiles'),
      files(){ 
          let search = this.search.toLowerCase()

          if(search.length != 0)
            return this.servingFiles.filter( file =>
                file.name.toLowerCase().includes(search) || 
                file.cusa.toLowerCase().includes(search) ||
                file.status.toLowerCase().includes(search)
              )

          return this.servingFiles
      },
  },

  methods: {
      run(i=0){
          clearInterval(this.ints[i])
          this.files[i].percentage = 0
          this.files[i].status = 'installing'

          this.ints[i] = setInterval( () => {
              let x = this.files[i]
              console.log("run test", x)

              let value = x.percentage + this.getRandomInt(15)

              if(value < 100){
                x.percentage = value
                x.status = 'installing'
              }
              else {
                clearInterval(this.ints[i])
                x.percentage = 100
                x.status = 'finish'
              }
          }, 1000)
      },

      stop(i){
          clearInterval(this.ints[i])
          this.files[i].status = 'pause'
      },

      getRandomInt(max) {
          return Math.floor(Math.random() * max);
      },

      getStatusType(type){
          if(type == 'serving' || type == 'pause')
            return 'info'

          if(type == 'finish')
            return 'success'

          if(type == 'installing')
            return 'primary'
      },

      check(url){
          window.open(url)
      },

  }
}
</script>

<style lang="css" scoped>
</style>
