<template>
  <router-view _key="$route.path" />
</template>

<script>
import './scss/app.scss';

export default {
  name: 'App',

  data(){ return {
    versions: {
      app: require('./../../package.json').version,
      electron: process.versions.electron,
      electronWebpack: require('electron-webpack/package.json').version
    }
  }},

  methods:{
      open(b){
          require('electron').shell.openExternal(b)
      }
  },
}
</script>
<style lang="css" scoped>
</style>
