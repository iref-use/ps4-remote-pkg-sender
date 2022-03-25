<template>
<div>
    <i class="fab fa-playstation" style="font-size: 40px; margin-bottom: 10px;" v-if="false" />

    <h2>Information</h2>
    <br>
    app: {{ $root.versions.app }} <br>
    electron: {{ $root.versions.electron }} <br>
    electron-webpack: {{ $root.versions.electronWebpack }} <br>
    platform: {{ platform }} <br>
    <br>
    runtime: {{ time }} sec's since start <br>
    started: {{ started }} times started <br>
    <br>
    <el-divider />

    Thanks to everyone that makes this community great. <br>

    <el-divider />

    Thanks to flatz, Specter, xvortex, <br>
    and all initial developers for their efford on the scene.<br>
     <br>
    Thanks to my primary testers <br>
    CyB1K, mtnjustme, Masamune3210, hypermist. <br>
    <br>
    Thanks to Sam Daniel for the <br>first full fledged Tutorial on windows and mac. <br>
    <br>
    Thanks to the awesome community and everyone else on their feedback that I am missing here.
    If you like what I did and want to support me and my development, don't forget to checkout my ko-fi.
    <br>
    <el-divider />

    Mega thanks to my wife and her patience (or not having it) on
    endless hours of development and debugging troubles.

    <el-divider />

    <el-button size="mini" @click="crash" v-if="false"> Crash it! </el-button>

    <template v-if="debug">
      <pre>{{ ps4 }}</pre>
      <pre>{{ server }}</pre>
    </template>
</div>
</template>

<script>
import { get } from 'vuex-pathify'
import os from 'os'

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
      platform(){
        return os.type() + ' ' + os.release() + ' ' + os.platform()
      },
  },

  methods: {
      crash(){
          alert("Crashing" + { crash: true })
          process.crash()
      },
  }

}
</script>

<style lang="css" scoped>
</style>
