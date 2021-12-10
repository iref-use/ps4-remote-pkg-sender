<template>
<div>
    <h2>Information</h2>
    <br>
    app: {{ $root.versions.app }} <br>
    electron: {{ $root.versions.electron }} <br>
    electron-webpack: {{ $root.versions.electronWebpack }} <br>
    runtime: {{ time }} sec's since start <br>
    <br>
    <br>
    Thanks to everyone that makes this community great. <br>
    <br>
    Special thanks to.

    <el-divider />

    <pre>{{ server }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Info',

  computed: {
      time: get('app/time'),
      server: get('app/server'),
  }

}
</script>

<style lang="css" scoped>
</style>
