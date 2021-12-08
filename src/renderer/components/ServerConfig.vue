<template>
<div id='server_config'>

  <el-form :inline="true" label-width="150px" size="mini" label-position="left">
      <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="Local Server IP">
                  <el-select v-model="server.ip" placeholder="Networkinterface" default-first-option>
                    <el-option :label="i.title" :value="i.ip" v-for="i in ifaces"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="Local Server Port">
                <el-input v-model="server.port"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-button size="mini">Change Port </el-button>
          </el-col>
      </el-row>
  </el-form>

  <template v-if="debug">
    <pre>Server {{ server }}</pre>
    <pre>Interfaces {{ ifaces }}</pre>
  </template>

</div>
</template>

<script>
export default {
    name: 'ServerConfig',

    data(){ return {
        debug: false,
        
        server: {
            ip: '',
            port: '1337',
        },

        ifaces: []
    }},

    mounted(){
        this.loadNetworkInterfaces()
    },

    methods: {
        loadNetworkInterfaces(){
            this.ifaces = this.$helper.getNetWorkInterfaces()

            if(this.ifaces.length){
                // this.server.iface = this.ifaces[0]
            }
        },


    }
}
</script>

<style lang="css" scoped>
</style>
