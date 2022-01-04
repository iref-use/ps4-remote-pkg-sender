<template>
<div>
    <i class="fab fa-playstation" style="font-size: 40px; margin-bottom: 10px;" />
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
    <br>
    Thanks to everyone that makes this community great. <br>
    <br>
    Special thanks to flatz, Specter, xvortex, CyB1K. <br>

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
