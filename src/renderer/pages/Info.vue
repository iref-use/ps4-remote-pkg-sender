<template>
<div>
    <i class="fab fa-playstation" style="font-size: 40px; margin-bottom: 10px;" />
    <h2>Information</h2>
    <br>
    app: {{ $root.versions.app }} <br>
    electron: {{ $root.versions.electron }} <br>
    electron-webpack: {{ $root.versions.electronWebpack }} <br>
    runtime: {{ time }} sec's since start <br>
    started: {{ started }} times started <br>
    <br>
    <br>
    Thanks to everyone that makes this community great. <br>
    <br>
    Special thanks to flatz, Specter, xvortex. <br>

    <el-divider />

    Mega thanks to my wife and her patience (or not having it) on
    endless hours of development and debugging troubles.

    <template v-if="debug">
      <pre>{{ ps4 }}</pre>
      <pre>{{ server }}</pre>
    </template>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Info',

  data(){ return {
      debug: false,
  }},

  computed: {
      started: get('app/started'),
      time: get('app/time'),
      server: get('app/server'),
      ps4: get('app/ps4'),
  }

}
</script>

<style lang="css" scoped>
</style>
