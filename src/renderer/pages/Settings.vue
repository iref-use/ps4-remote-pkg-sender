<template >
<div>

    <AppConfig />

    <br>

    <el-button size="mini" @click="$store.dispatch('app/resetConfig')"> Reset App Settings </el-button>

    <div v-if="app.config.showConfigObject">
        <div style="height: 40px" />

        <el-divider content-position="left">Your current settings object</el-divider>
        <pre>{{ app }}</pre>
    </div>
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
