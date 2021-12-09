<template>
<div class="">

  <h2 style="margin-bottom: 20px;">Your are on version {{ $root.versions.app }}</h2>

  <el-timeline>
    <el-timeline-item timestamp="2.0.1" placement="top">
        <h4>Creation time</h4>
        <p>
          Adding vue-router, -vuex, -vuex-pathify and -router to the depencies. <br>
          Preparing i18n multi language support but having English only for now. <br>
          Adding element-ui as css and components framework. <br>
          Creating custom Layouts for FullScreen and Menu based Views. <br>
          Creating Router and binding pages with custom layouts. <br>
          Creating Pages and NavBar to navigate though each view. <br>
          Creating a Info View with little information and thanks stuff. <br>
          Creating Store to save application setting values across all renderer processes. <br>
          Adding PS4 PKG Installler (ps4 pkg) to the misc's to have it ready to download. <br>
          Fixing window close process and quit the app correctly. <br>
          Closing windows will not quit the app directly, so server and client should still be running. <br>
          Adding Error catch route for not found views. <br>
          Adding Changelogs. <br>
          Adding Config folder with predefined links for misc stuff. <br>
        </p>
    </el-timeline-item>

    <el-timeline-item timestamp="2.0.0" placement="top">
       <h4>Refactoring</h4>
       <p>
         Start with the refactoring process. <br>
         Adding Sass pre-compiler for Styling purposes. <br>
         Adding Webpack to automate the reloading process (hmr) on file updates. <br>
         Adding electron-webpack to apply easy webpack config with electron. <br>
         Adding vue as front-end Framework to work with vDOM instead of html. <br>
         Creating single file components (SFC) to make components modular. <br>
         Creating helper file for the main process and outsource BrowserWindow functions. <br>
         Extending the Menu with Info items. <br>
         Creating Tray Icon and items. <br>
         Adding PS Logos to the App and Tray Icon. <br>
         Change Build command from electron-packer to electron-builder. <br>
         Testing and fixing stuff for the first prototype production build.<br>
       </p>
    </el-timeline-item>
  </el-timeline>

</div>
</template>

<script>
export default {
  name: "Changelog",

  data(){ return {

  }},

}
</script>
