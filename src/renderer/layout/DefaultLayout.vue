<template>
<el-container>

      <el-header>
          <el-menu :default-active="'home'" :router="true" mode="horizontal" @select="handleSelect">
              <el-menu-item index="home">Processing Center</el-menu-item>

              <el-menu-item index="server">Server</el-menu-item>

              <el-menu-item index="config">Config</el-menu-item>

              <el-submenu index="miscs">
                  <template slot="title">Miscs</template>
                  <el-menu-item @click="openLink(links.ps4_rkg_installer)">PS4 PKG Installer</el-menu-item>
                  <el-menu-item index="changelog">Changelog</el-menu-item>
                  <div style="background: #ddd; height: 1px; margin: 5px 0px" />
                  <el-menu-item @click="openLink(links.github_repo)">GitHub Repo</el-menu-item>
                  <el-menu-item @click="openLink(links.report_issue)">Report a Issue</el-menu-item>
              </el-submenu>

              <el-menu-item index="settings">Settings</el-menu-item>

          </el-menu>
      </el-header>

      <el-main>
          <router-view />
      </el-main>

</el-container>
</template>

<script>
import { shell } from 'electron'
import links from '@/../config/links'

export default {
  name: 'DefaultLayout',

  data(){ return {
      links,
  }},

  methods: {
      handleSelect(val){
          console.log('Select View ', val)
          // this.$router.push({ name: val })
      },

      openLink(link){
          shell.openExternal(link)
      }
  }
}
</script>

<style lang="css" scoped>
</style>
