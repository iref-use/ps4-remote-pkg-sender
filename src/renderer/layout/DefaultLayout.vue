<template>
<el-container>
      <el-header>
          <TitleBar />

          <el-menu class="draggable" :default-active="'home'" :router="true" mode="horizontal" ref="menu" @select="handleSelect">
              <el-menu-item index="home" ref="home">Processing Center</el-menu-item>

              <el-menu-item index="server" ref="server">Server</el-menu-item>

              <el-menu-item index="hb-store" ref="server" v-if="config.useHB">HB-Store</el-menu-item>

              <el-menu-item index="config">Config</el-menu-item>

              <el-submenu index="miscs">
                  <template slot="title">Miscs</template>

                  <el-menu-item index="downloads">Downloads</el-menu-item>
                  <el-menu-item index="changelog">Changelog</el-menu-item>

                  <div style="background: #ddd; height: 1px; margin: 5px 0px" />

                  <el-menu-item @click="$root.open(links.troubleshoot)">Troubleshooting Guide</el-menu-item>

                  <div style="background: #ddd; height: 1px; margin: 5px 0px" />

                  <el-menu-item @click="$root.open(links.github_repo)">GitHub Repo</el-menu-item>
                  <el-menu-item @click="$root.open(links.report_issue)">Report a Issue</el-menu-item>
              </el-submenu>

              <el-menu-item index="settings">Settings</el-menu-item>

              <div class='close_application'>
                  <i class="el-icon-switch-button" />
              </div>

          </el-menu>
      </el-header>

      <el-main>
          <div class="main_content_offset" />
          <router-view />
      </el-main>

</el-container>
</template>

<script>
import { get } from 'vuex-pathify'
import { shell } from 'electron'
import links from '@/../config/links'
import { ipcRenderer } from 'electron'

export default {
  name: 'DefaultLayout',

  data(){ return {
      links,
  }},

  computed: {
      config: get('app/config'),
  },

  mounted(){
      this.registerChannel()
  },

  methods: {
      registerChannel(){
          ipcRenderer.on('main-route', (event, data) => {
              this.move(data)
          })
      },

      move(params){
         let from  = this.$route.fullPath
         let to    = this.$router.resolve(params).route.fullPath

         if(from === to) {
             return
         }

         this.$router.push(params)
         this.$refs.menu.activeIndex = params
      },

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
