<template>
<div>

  <div v-for="route in routes">
      {{ route }}
  </div>

</div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
    name: 'Routes',

    computed: {
        routes: get('server/routes'),
    },
}
</script>

<style lang="css" scoped>
</style>
