<template>
  <router-view _key="$route.path" />
</template>

<script>
import './scss/app.scss';

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
  },

  methods:{
      open(b){
          require('electron').shell.openExternal(b)
      },

      sendServer(msg){
          ipcRenderer.send('server', msg)
      },
  },
}
</script>
<style lang="css" scoped>
</style>
