<template>
<div>
    <pre>{{ servingFiles }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Debug',

  computed: {
      serverFiles: get('server/serverFiles'),
      servingFiles: get('server/servingFiles'),
  }
}
</script>

<style lang="css" scoped>
</style>
