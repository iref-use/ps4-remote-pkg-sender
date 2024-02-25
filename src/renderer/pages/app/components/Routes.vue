<template>
<div>

  <div class="route" v-for="route in routes">
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

<style lang="scss" scoped>
.route {
    display: block;
    margin-bottom: 2px;
}
</style>
