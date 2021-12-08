<template>
<el-container>

    <el-container>
      <el-main>
        <ServerConfig />

        <PS4Config />
        
        <el-divider />

        <mainComponents />
      </el-main>
    </el-container>

</el-container>
</template>

<script>
import './scss/app.scss';

import aside from './layout/aside'
import header from './layout/header'

import mainComponents from './components/main'

export default {
  name: 'App',

  components: {
      // aside,
      // header,
      mainComponents
  },

  data(){ return {
      showNavigation: false,
  }},

  methods: {

  }

}
</script>
<style lang="css" scoped>
</style>
