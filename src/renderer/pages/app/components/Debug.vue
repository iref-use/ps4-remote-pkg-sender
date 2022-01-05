<template>
<div>
    {{ serverFiles.length }} files found <br>
    {{ servingFiles.length }} files serving <br>
    Server is <el-tag size="mini" :type="$helper.getServerStatusType(running)" >{{ running }}</el-tag> on {{ ip }}:{{ port }}<br>
    <br>
    <el-button size="mini" @click="$emit('hearthbeat')"> check hearthbeat </el-button> {{ hb }} <br>
    <br>
    <el-button size="mini" @click="startServer">Start Server </el-button>
    <el-button size="mini" @click="$emit('stopServer')"> Stop Server </el-button>
    <el-button size="mini" @click="$emit('restartServer')"> Restart Server </el-button>

</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Debug',

  computed: {
      ip: get('app/server.ip'),
      port: get('app/server.port'),
      serverFiles: get('server/serverFiles'),
      servingFiles: get('server/servingFiles'),
      running: get('server/status'),
      hb(){
          return 'http://' + this.ip + ':' + this.port + '/hb'
      }
  },

  methods: {
      startServer(){
          if(this.ip.length == 0 || this.port.length == 0){
              let error = "Server cannot start. Please configure IP and Port"
              this.$store.dispatch('server/addLog', error)
              this.$message({ type: 'warning', message: error });
              return
          }

          this.$emit('startServer')
      },
  }
}
</script>

<style lang="css" scoped>
</style>
