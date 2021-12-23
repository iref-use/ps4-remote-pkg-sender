<template>
<div id='server_config'>

  <el-divider content-position="left">Local Server Configuration</el-divider>

  <div class="q-pl-md">
  <el-form :inline="true" label-width="150px" size="mini" label-position="left">
      <el-row :gutter="10">
          <el-col :span="10">
              <el-form-item label="Server IP">
                  <el-select v-model="server.ip" placeholder="Networkinterface" default-first-option>
                      <el-option :label="i.title" :value="i.ip" v-for="i in ifaces" :key="i.ip"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="Port">
                <el-input v-model="server.port"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-button size="mini" style="width: calc(100% - 40px)" @click="$root.sendServer('refresh')"> Apply </el-button>
          </el-col>
      </el-row>

      <el-row :gutter="10">
          <el-col :span="10">
              <el-form-item label="Server App">
                  <el-select v-model="server.app" placeholder="Application" default-first-option>
                      <el-option :label="i.title" :value="i.app" :disabled="i.disabled" v-for="i in apps" :key="i.app"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="Status">
                  <el-tag size="small" style="width:100%;" :type="$helper.getServerStatusType(status)">{{ status }}</el-tag>
              </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-button size="mini" icon="el-icon-refresh" @click="$root.sendServer('refresh')"></el-button>
              <el-button size="mini" icon="el-icon-switch-button" @click="$root.sendServer('toggle')"></el-button>
          </el-col>
      </el-row>


      <el-row>
          <el-col :span="24">
              <el-form-item label="PKG Base Path" style="width: 100%;" class="base_path">
                <el-input placeholder="Select your base path of your PKG's" v-model="server.base_path">
                    <el-button slot="append" icon="el-icon-folder" @click.native="selectBasePath"></el-button>
                </el-input>
              </el-form-item>
          </el-col>
      </el-row>

      <div>
          <el-form-item label=" ">
              <el-checkbox v-model="server.auto_scan_on_startup" disabled>Auto scan base path on Startup</el-checkbox>
          </el-form-item>
      </div>
      <div>
          <el-form-item label=" ">
              <el-checkbox v-model="server.scan_subdir">Scan sub directories</el-checkbox>
          </el-form-item>
      </div>

  </el-form>
  </div>

  <template v-if="debug">
    <pre>Server {{ server }}</pre>
    <pre>Interfaces {{ ifaces }}</pre>
  </template>

</div>
</template>

<script>
import { get, sync } from 'vuex-pathify'
import { throttle } from 'lodash'
import { remote, ipcRenderer } from 'electron'

export default {
    name: 'ServerConfig',

    data(){ return {
        debug: false,

        ifaces: [],
        apps: [
          { title: "express", app: "express", disabled: false },
          { title: "apache", app: "apache", disabled: true },
          { title: "nginx", app: "nginx", disabled: true },
          { title: "proxy", app: "proxy", disabled: true },
          { title: "remote", app: "remote", disabled: true },
          { title: "custom", app: "custom", disabled: true },
        ]
    }},

    mounted(){
        this.loadNetworkInterfaces()
    },

    computed: {
        server: get('app/server'),
        status: get('server/status'),
    },

    watch: {
        // server: {
        //     deep: true,
        //     handler: throttle(this.save(), 2000)
        // },
        'server.ip'(){ this.save() },
        'server.base_path'(){
            this.save()
            this.loadFiles()
        },
        'server.port'(){ this.save() },
        'server.app'(){ this.save() },
        'server.auto_scan_on_startup'(){ this.save() },
        'server.scan_subdir'(){
            this.save()
            this.loadFiles()
        },
    },

    methods: {
        loadNetworkInterfaces(){
            this.ifaces = this.$helper.getNetWorkInterfaces()

            if(this.ifaces.length){
                // this.server.iface = this.ifaces[0]
            }
        },

        selectBasePath(){
            let path = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
            this.server.base_path = path[0]
        },

        loadFiles(){
            this.$store.dispatch('server/loadFiles', this.server.base_path)
        },

        save(){
            console.log("Saving Local Server Configuration")
            this.$store.dispatch('app/setServer', this.server)
        },

    }
}
</script>

<style lang="scss">
.input_base_path .el-form-item__content {
  width: calc(100% - 175px);
}

.base_path .el-form-item__content {
  width: calc(100% - 190px);
}
</style>
