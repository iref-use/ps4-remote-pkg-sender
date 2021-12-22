<template>
<div>

  <el-button size="mini" @click="$store.dispatch('queue/reset')"> Reset Queue and Tasks </el-button>

  <Queue />

  <Tasks />

  <mainComponents v-if="false" />

  <pre>{{ queue }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Index',

  computed: {
      server: get('app/server'),
      queue: get('queue'),      
  }
}
</script>

<style lang="css" scoped>
</style>
