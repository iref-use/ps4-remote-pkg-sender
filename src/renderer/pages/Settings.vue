<template >
<div>
    <h2>Application Settings</h2>

    <p>
      No Settings are avaible yet. <br>
      <br>
      Future Ideas would be import and export Settings. <br>
      That could be usefull if someone adds secured CDN / Server configurations that you may import. <br>
    </p>
    <br>

    <el-divider content-position="left">Your current settings object</el-divider>

    <pre>{{ app }}</pre>
</div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: "Settings",

  computed: {
      app: get('app'),
  }
}
</script>

<style lang="scss" scoped>
</style>
