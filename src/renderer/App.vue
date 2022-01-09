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

  errorCaptured(err, vm, info) {
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.
    console.log(err, vm, info)
    alert(err)

    // TODO: Perform any custom logic or log to server
    // return false to stop the propagation of errors further to parent or global error handler
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

          ipcRenderer.on('error', (event, data) => {
              console.log(event, data)
              alert(data)
          })
      },

      open(b){
          require('electron').shell.openExternal(b)
      },

      sendServer(msg){
          ipcRenderer.send('server', msg)
      },

      openServer(){
          ipcRenderer.send('server-show')
      },

      sendMain(msg){
          console.log('sending to main', msg)
          ipcRenderer.send('main', msg)
      },

      sendPS4(msg){
          console.log('sending to ps4', msg)
          ipcRenderer.send('ps4', msg)
      },

  },
}
</script>
<style lang="css" scoped>
</style>
