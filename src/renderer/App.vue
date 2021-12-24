<template>
  <router-view _key="$route.path" />
</template>

<script>
import './scss/app.scss';
// import "@fortawesome/fontawesome-free/js/all";

import { remote, ipcRenderer } from 'electron'

export default {
  name: 'App',

  data(){ return {
    versions: {
      app: require('./../../package.json').version,
      electron: process.versions.electron,
      electronWebpack: require('electron-webpack/package.json').version
    }
  }},

  mounted(){
      this.$store.dispatch('app/started')
      this.registerChannel()
  },

  methods:{
      registerChannel(){
          ipcRenderer.on('main', (event, data) => {
              console.log(event, data)
              this.$message({ type: 'info', message: data });
          })

          ipcRenderer.on('main-error', (event, data) => {
              this.$message({ type: 'error', message: data })
          })
      },

      open(b){
          require('electron').shell.openExternal(b)
      },

      sendServer(msg){
          ipcRenderer.send('server', msg)
      },

      sendMain(msg){
          console.log('sending to main', msg)
          ipcRenderer.send('main', msg)
      },
  },
}
</script>
<style lang="css" scoped>
</style>
