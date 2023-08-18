<template>
<el-container>
      <el-header>
          <TitleBar />

          <el-menu :default-active="'home'" :router="true" mode="horizontal" ref="menu" @select="handleSelect">
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

              <div class='top_right_header'>
                  <el-button size="mini" icon="el-icon-user" round @click="$router.push({ name: 'user' })"> User </el-button>

                  <el-badge :is-dot="true" value="new" :hidden="!newVersionAvailable" class="sync_icon">
                      <div class="" @click="checkUpdate">
                          <i class="el-icon-refresh" />
                      </div>
                  </el-badge>

                  <el-dropdown class="window_dropdown" @command="handleViewCallback">
                    <i class="el-icon-files" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="server"> Open Local Server </el-dropdown-item>
                      <el-dropdown-item command="ps4"> Open PS4 API Logs </el-dropdown-item>
                      <el-dropdown-item command="info"> Info </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>

                  <div class='close_application' @click="closeApplicationRequest">
                      <i class="el-icon-switch-button" />
                  </div>
              </div>

          </el-menu>
      </el-header>

      <el-main class="main_view" ref="main">
          <div class="main_content_offset" />

          <DragAndDrop :files="draggedFiles" @close="showDragAndDropOverlay = false" v-if="showDragAndDropOverlay" />

          <router-view />

          <div style="margin-top: 100px; display:block;">
              <transition name="el-zoom-in-bottom">
                <el-button round icon="el-icon-arrow-up" class="scrollToTop" @click="scrollToTop" v-show="scrollOffset < scrollPosition"> Back to Top </el-button>
              </transition>
          </div>

          <LatestVersionInfo ref="LatestVersionInfo" />
      </el-main>

</el-container>
</template>

<script>
import { get } from 'vuex-pathify'
import { shell } from 'electron'
import links from '@/../config/links'
import { ipcRenderer, remote } from 'electron'

export default {
  name: 'DefaultLayout',

  data(){ return {
      links,
      scrollOffset: 500,
      scrollPosition: 0,
      newVersionAvailable: true,
      showDragAndDropOverlay: false,
      draggedFiles: [],
  }},

  computed: {
      config: get('app/config'),      
  },

  mounted(){
      this.registerChannel()
      this.autoCheckUpdate()

      window.addEventListener('scroll', this.scroll)
      window.addEventListener('dragover', this.dragover)
      window.addEventListener('drop', this.drop)
  },

  destroyed(){
      window.removeEventListener('scroll', this.scroll)
      window.removeEventListener('dragover', this.dragover)
      window.removeEventListener('drop', this.drop)
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
      },

      closeApplicationRequest(){
          this.$confirm('Do you really want to close the Application? \nThis stops the server and all child processes.', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true
          }).then(() => {
              ipcRenderer.send('quit')
          }).catch(() => {

          });
      },

      handleViewCallback(view){
          ipcRenderer.send('show', view)
      },

      scroll(e){
          this.scrollPosition = window.pageYOffset
      },

      scrollToTop(){
          window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
          })
      },

      async checkUpdate(){
          let release = await this.$git.getLatestRelease()
          if(!release) return

          this.$refs.LatestVersionInfo.open(release)
          this.newVersionAvailable = false
      },

      async autoCheckUpdate(){
          let release = await this.$git.getLatestRelease()
          if(!release) return

          // patch root app version for debug purpose
          // this.$root.versions.app = "2.7.3"

          let version = this.$git.getVersion(release)
          let current = this.$root.versions.app
          let compare = this.$git.compareVersion(current, version)
          // console.log("Autocheck for latest updates on startup", compare)

          if(compare == -1){
              this.newVersionAvailable = true
              this.$refs.LatestVersionInfo.open(release)
          }
          else {
              this.newVersionAvailable = false
          }                    
      },

      dragover(e){
        e.preventDefault();
        e.stopPropagation();        
        
        this.showDragAndDropOverlay = true
        this.draggedFiles = []
      },

      drop(e){
        e.preventDefault();
        e.stopPropagation();        

        let files = [];
        for (const f of event.dataTransfer.files) {            
            // console.log('File Object of dragged files: ', f)

            if( f.path.includes('.pkg') ){
                files.push(f.path);
            }
            else {
                let filesInFolder = this.$fs.getFiles(f.path, true).filter( file => this.$fs.isPKG(file) )
                // console.log("Files in Folder", f.path, filesInFolder)
                files.push(...filesInFolder)
            }
        }
        
        if( files.length == 0 ){
            this.showDragAndDropOverlay = false    
            this.draggedFiles = []
            this.$root.sendMain("No PKG Files found in the Drag and Drop")
            return    
        }
        
        this.showDragAndDropOverlay = true
        this.draggedFiles = files    
      },

  }
}
</script>

<style lang="scss" scoped>

</style>
