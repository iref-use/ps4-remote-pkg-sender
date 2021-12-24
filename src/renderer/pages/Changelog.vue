<template>
<div class="">

  <h2 style="margin-bottom: 20px;">Your are on version {{ $root.versions.app }}</h2>

  <el-timeline>
    <el-timeline-item timestamp="2.3.0" placement="top">
        <h4>Prepare PS4 PKG API </h4>
        <p>
          Remove and resort dependencies. <br>
          Create PS4 Plugin to handle API requests. <br>
          Add Button to remove finished files manually. <br>
          Create a regex to filter cusa from filename. <br>
          Added CORS handler to the express Server. <br>
          Wrote a wrapper for axios to disable preflight requests. <br>
          Adding check requests to check axios against the server hearthbeat. <br>
          Adding isInstalled method to check if file exists on ps4. <br>
          Adding JSON5 parser to parse hex values when RPI responds with it. <br>
          Add custom error handler for Network Error, when PS4 is not available. <br>
          Refactor isInstalled method and outsourced the working code into the PS4 Plugin. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.2.0" placement="top">
        <h4>Queue and Tasks</h4>
        <p>
          Prepare Queue and Tasks storage module. <br>
          Adding main channel for communication across windows. <br>
          Adding Error Message Push Notification when trying to start Server with inccorect params. <br>
          Handling server start and stop with response in case of error. <br>
          Adding file search filter for serving files and queued files. <br>
          Create queue table and test process handler. <br>
          Added fontawesome Icons to the build. <br>
          Refactor status, size and type methods to helper class. <br>
          Check files if they are already in the queue and add them if not. <br>
          Handling files to queue and simulated install process. <br>
          Handling post install process, mark files as installed. <br>
          Mark files in queue or installed on reload serving files. <br>
          Update file status on queue, installed and serving when updating file. <br>
        </p>
    </el-timeline-item>

    <el-timeline-item timestamp="2.1.1" placement="top">
        <h4>Handling of serving server files</h4>
        <p>
          Create Sub directory search option. <br>
          Add sub directory search with custom walk method. <br>
          Fix createItem to work with deep folder structure. <br>
          Add a more detailed error logging on server listen errors. <br>
          Create dedicated Router for express. <br>
          Apply Router to express as middleware.<br>
          Reset Router serving files after reloading server files. <br>
          Fix getter of current active routes in Server Routes view. <br>
          Refactor getFiles method handle search in base path and sub directories. <br>
          Update Server Config fields to make them look prettier. <br>
          Add file size of to the server files in readable format. <br>
          Add channel communication between main and server. <br>
          Add send method globaly to and reducing duplicated code. <br>
          Optiimzing start up and quick fix double reload of files on start. <br>
        </p>
    </el-timeline-item>

    <el-timeline-item timestamp="2.1.0" placement="top">
        <h4>All about http Server</h4>
        <p>
          Creating seperate Server Window for the http stuff. <br>
          Adding heathbeat endpoint to verify base checkup. <br>
          Adding server handling methods for start, stop and restarting. <br>
          Outsourcing base path file scan from app to server. <br>
          Filtering files by .pkg extension. <br>
          Load Files at base path and sync with store. <br>
          Optimize file search and create file item objects with full path.<br>
          Add proper Server logging of server events. <br>
          Add Routes View to list all registered routes by the server. <br>
        </p>
    </el-timeline-item>

    <el-timeline-item timestamp="2.0.2" placement="top">
        <h4>Storage sync</h4>
        <p>
          Fixing vuex-store handling across all windows. <br>
          Make the storage persistent. <br>
          Make the settings value sync to the storage (no seperate save required). <br>
          Loading vuex on application start. <br>
        </p>
    </el-timeline-item>

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
