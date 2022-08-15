<template>
<div class="">

  <h2 style="margin-bottom: 20px;">You are on version {{ $root.versions.app }}</h2>

  <el-timeline>
    <el-timeline-item timestamp="2.8.0" placement="top">
        <h4>Update</h4>
        <p>
          Adding security policies to components. <br>
          Adding custom window handler and component to download remote items. <br>
          Adding animation to download window. <br>
          Server Tab can change server path path now directly. <br>
          Adding reload files notification. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.7.2" placement="top">
        <h4>Optimization</h4>
        <p>
          Add custom TitleBar Settings to choose specific Style. <br>
          Refactor TitleBar Buttons to work on Windows. <br>
          Add opening methods to access specific view directly. <br>
          Add new logo to the info view. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.7.1" placement="top">
        <h4>Prefinings</h4>
        <p>
          Add System Wide Notification Settings and Notification. <br>
          Enable PS4 App RPI OOP with custom port. <br>
          Add callback for Queue Scanner to continue if a file exists. <br>
          Add Custom TitleBar with coloring based on the Style settings. <br>
          Add Window operation buttons for linux and windows. <br>
          Add close application button to the header menu.  <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.7.0" placement="top">
        <h4>Queue Scanner</h4>
        <p>
          Prepare Queue Scanner settings. <br>
          Put operation buttons together as button group. <br>
          Sync Queue Sanner Button on the Process Center. <br>
          Add Autostart Button. <br>
          Add Linux deb package with x64, ia32 and amvl7 architecture. <br>
          Handle Queue Scanner process, one by one (more performance instead of batch). <br>
          Extend PS4 API error logging. <br>
          Add a message when everything is done and there are no items in the queue left. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.6.1" placement="top">
        <h4>HB-Store direct install</h4>
        <p>
          Added autoclose function to close the Downloading window. <br>
          Refactor HB Store Legacy Component. <br>
          Create new HB Store Component for the refactored version. <br>
          Map new HB Store Items data to the app Data. <br>
          Add coloring schema for the new categories. <br>
          Fix hb-store item direct install. <br>
          Update Changelog and Troubleshooting Guide. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.6.0" placement="top">
        <h4>Update & Darkmode</h4>
        <p>
          Handle application closing with child process kill after Application Quit. <br>
          Add AppImage, deb and snap to Linux build command. <br>
          Fix static asset paths for developing mode. <br>
          Add new Logo for Homebrew Store on the Download View. <br>
          Added Darkmode SCSS styling. <br>
          Added Style Schematics for the Application Scrollbar. <br>
          Update Settings View with proper content splitting. <br>
          Prepare HB-Store Settings for legacy, refactored and custom CDN. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.5.2" placement="top">
        <h4>Application Settings </h4>
        <p>
          Added more explicit HB Configuration. <br>
          Moved scss styling to global css file for full-width inputs. <br>
          Added RPI OOP to the Download Area. <br>
          Extend the Settings options to show current Config Object data. <br>
          Disable direct input for base_path. Now you need to choose it with the file explorer. <br>
          Adding a custom popup for manual path input. <br>
          Added rest timer with human readable time. <br>
          Added css to fix the header, so it stays there when you scroll. <br>
          Added prefix full path URL to the serving file (CyB1K request), so every file is unique. <br>
          Added Suport Information on Settings View if anyone want to help and support me. <br>
          Stop Interval if there is an error. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.5.1" placement="top">
        <h4>Further upgrades </h4>
        <p>
          Added Download View for RPI and HB-Store. <br>
          Added Troubleshooting Guide to the Miscs. <br>
          Fix flashing on Configuration pages when pressing enter (not necesarry). <br>
          Fix base_path configuration error when opening file explorer and canceling it. <br>
          Updated Info Window size and content. Applied additional thanks. <br>
          Added experimental add url endpoint. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.5.0" placement="top">
        <h4>Further upgrades </h4>
        <p>
          Extend main Window width to 1300px. <br>
          Add button to remove files from Queue. <br>
          Disable Queued file operation buttons when no task exists. <br>
          On Config View change apply to server button to open Server Window. <br>
          Add Application Settings. <br>
          Prepare HB-Store tab with prototype content of HB-Store-R2. <br>
          Create Item Objects from HB-Store package response. <br>
          Add Table Expandable Row to see all properties of Item Object. <br>
          Add remove Item from queue button in Queue, Server and HB-Store view. <br>
          Added Pagination to HB-Store Table view. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.4.3" placement="top">
        <h4>Fixing storage race condition </h4>
        <p>
          Put storage creation into a while loop until store creates successfully. <br>
          This prevents the application to crash which was still the case on win11. <br>
          Lowered the write throttle for the storage to 1000ms instead of 3300ms. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.4.2" placement="top">
        <h4>Optimizing Request Handling </h4>
        <p>
          Adding rest_sec_total value to condition to determine if file is installed. <br>
          Adding ps4 request timeout to configs to kill pending requests when they take to long. <br>
          Adding error messages for fail responses with hex to int mapped status values. <br>
          Added deeper logging of PS4 Requests to the PS4 API Logs Window. <br>
          Putting little design to the PS4 API Logs Window to make it more readable. <br>
          Adding ps4 update interval config to manually set the interval. <br>
          Added Server Check to see if the server is working properly. <br>
          Added PS4 Check to see if we have a connection to RPI itself. <br>
          Added extendable Row for Server files to see path and url of the file. <br>
          Added dedicated Troubleshooting.md to have a central helper guide for now. <br>
          Added Menu links for Changelog and Troubleshoot. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.4.1" placement="top">
        <h4>Handling Errors </h4>
        <p>
          Adding global error catcher and crashReporter for debugging purposes. <br>
          Fixing the Install request Error, because port was missing on the default ps4 config. <br>
          Thanks for iceMongus and CyB1K for testing with me. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.4.0" placement="top">
        <h4>Application bundling </h4>
        <p>
          Fix windows race condition error for storage. <br>
          Preparing auto-update feature. <br>
          Finishing Info Window with content. <br>
          Adding menu items from tray to menu<br>
          Adding build commands for mac, windows and linux. <br>
          Adding dmg build options. <br>
          Adding windows build options and fixing backslash error. <br>
          Testing portable build on windows and fixing windows stuff. <br>
          Adding linux build options to the build script. <br>
        </p>
    </el-timeline-item>
    <el-timeline-item timestamp="2.3.1" placement="top">
        <h4>PS4 API </h4>
        <p>
          Fixing PS4 API Responses and add correct error catcher. <br>
          Add Timeout to requests and validate false positive errors. <br>
          Create PS4 API Logs Window and Channel to log ps4 responses separatly. <br>
          Extend Processing Center Task Row with additional operation buttons. <br>
          Create a custom logger method with timestamp and data object. <br>
          Add browser min size values based on given sizes. <br>
          Lower request timeout value to 2,2secs. <br>
          Refine queued Task Information, expanded table row. <br>
          Fix redundant move when moved is triggered through tray menu.<br>
        </p>
    </el-timeline-item>
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
          Add Timeout on isInstalled request. Check and catch custom timeout error. <br>
          Refactor Simulated install process, split start script and outsource methods. <br>
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
          Commit file status on queue when it changes. <br>
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
