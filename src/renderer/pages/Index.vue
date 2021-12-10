<template>
<div>

  <mainComponents />

  <pre>{{ server }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Index',

  computed: {
      server: get('app/server'),
  }
}
</script>

<style lang="css" scoped>
</style>
