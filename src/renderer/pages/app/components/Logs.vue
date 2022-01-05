<template>
<div>

  <el-button size="mini" @click="$store.dispatch('server/resetLogs')"> Reset Logs </el-button>
  <div v-for="log in logs">
      {{ log.time }} | {{ log.message }}
  </div>

</div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
    name: 'Logs',

    computed: {
        logs: get('server/logs'),
    },
}
</script>

<style lang="css" scoped>
</style>
