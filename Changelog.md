# PS4 Remote PKG Sender v2  - Changelog

### v2.6.1
#### HB-Store direct install  
        Added autoclose function to close the Downloading window.  
        Refactor HB Store Legacy Component.  
        Create new HB Store Component for the refactored version.  
        Map new HB Store Items data to the app Data.  
        Add coloring schema for the new categories.  
        Fix hb-store item direct install.  
        Update Changelog and Troubleshooting Guide.  

### v2.6.0
#### Update & Darkmode  
        Handle application closing with child process kill after Application Quit.  
        Add AppImage, deb and snap to Linux build command.  
        Fix static asset paths for developing mode.  
        Add new Logo for Homebrew Store on the Download View.  
        Added Darkmode SCSS styling.  
        Added Style Schematics for the Application Scrollbar.  
        Update Settings View with proper content splitting.  
        Prepare HB-Store Settings for legacy, refactored and custom CDN.  

### v2.5.2
#### Application Settings
        Added more explicit HB Configuration.  
        Moved scss styling to global css file for full-width inputs.  
        Added RPI OOP to the Download Area.  
        Extend the Settings options to show current Config Object data.  
        Disable direct input for base_path. Now you need to choose it with the file explorer.  
        Adding a custom popup for manual path input.  
        Added rest timer with human readable time.  
        Added css to fix the header, so it stays there when you scroll.  
        Added prefix full path URL to the serving file (CyB1K request), so every file is unique.  
        Added Suport Information on Settings View if anyone want to help and support me.  

### v2.5.1
#### Further upgrades
        Added Download View for RPI and HB-Store.  
        Added Troubleshooting Guide to the Miscs.  
        Fix flashing on Configuration pages when pressing enter (not necesarry).  
        Fix base_path configuration error when opening file explorer and canceling it.  
        Updated Info Window size and content. Applied additional thanks.  
        Added experimental add url endpoint.  


### v2.5.0
#### Further upgrades
        Extend main Window width to 1300px.  
        Add button to remove files from Queue.  
        Disable Queued file operation buttons when no task exists.  
        On Config View change apply to server button to open Server Window.  
        Add Application Settings.  
        Prepare HB-Store tab with prototype content of HB-Store-R2.  
        Create Item Objects from HB-Store package response.  
        Add Table Expandable Row to see all properties of Item Object.  
        Add remove Item from queue button in Queue, Server and HB-Store view.  
        Added Pagination to HB-Store Table view.  

### v2.4.3
#### Fixing storage race condition
        Put storage creation into a while loop until store creates successfully.  
        This prevents the application to crash which was still the case on win11.  
        Lowered the write throttle for the storage to 1000ms instead of 3300ms.   

### v2.4.2
#### Optimizing Request Handling
        Adding rest_sec_total value to condition to determine if file is installed.   
        Adding ps4 request timeout to configs to kill pending requests when they take to long.   
        Adding error messages for fail responses with hex to int mapped status values.   
        Added deeper logging of PS4 Requests to the PS4 API Logs Window.   
        Putting little design to the PS4 API Logs Window to make it more readable.   
        Adding ps4 update interval config to manually set the interval.   
        Added Server Check to see if the server is working properly.   
        Added PS4 Check to see if we have a connection to RPI itself.   
        Added extendable Row for Server files to see path and url of the file.   
        Added dedicated Troubleshooting.md to have a central helper guide for now.   
        Added Menu links for Changelog and Troubleshoot.  

### v2.4.1
#### Handling Errors   
        Adding global error catcher and crashReporter for debugging purposes.   
        Fixing the Install request Error, because port was missing on the default ps4 config.   
        Thanks for iceMongus and CyB1K for testing with me.                   

### v2.4.0
#### Application bundling   
        Fix windows race condition error for storage.   
        Preparing auto-update feature.   
        Finishing Info Window with content.   
        Adding menu items from tray to menu  
        Adding build commands for mac, windows and linux.   
        Adding dmg build options.   
        Adding windows build options and fixing backslash error.   
        Testing portable build on windows and fixing windows stuff.   
        Adding linux build options to the build script.         

### v2.3.1
#### PS4 API   
        Fixing PS4 API Responses and add correct error catcher.   
        Add Timeout to requests and validate false positive errors.   
        Create PS4 API Logs Window and Channel to log ps4 responses separatly.   
        Extend Processing Center Task Row with additional operation buttons.   
        Create a custom logger method with timestamp and data object.   
        Add browser min size values based on given sizes.   
        Lower request timeout value to 2,2secs.   
        Refine queued Task Information, expanded table row.   
        Fix redundant move when moved is triggered through tray menu.        

### v2.3.0
#### Prepare PS4 PKG API   
        Remove and resort dependencies.   
        Create PS4 Plugin to handle API requests.   
        Add Button to remove finished files manually.   
        Create a regex to filter cusa from filename.   
        Added CORS handler to the express Server.   
        Wrote a wrapper for axios to disable preflight requests.   
        Adding check requests to check axios against the server hearthbeat.   
        Adding isInstalled method to check if file exists on ps4.   
        Adding JSON5 parser to parse hex values when RPI responds with it.   
        Add custom error handler for Network Error, when PS4 is not available.   
        Refactor isInstalled method and outsourced the working code into the PS4 Plugin.   
        Add Timeout on isInstalled request. Check and catch custom timeout error.   
        Refactor Simulated install process, split start script and outsource methods.         

### v2.2.0
#### Queue and Tasks  
        Prepare Queue and Tasks storage module.   
        Adding main channel for communication across windows.   
        Adding Error Message Push Notification when trying to start Server with inccorect params.   
        Handling server start and stop with response in case of error.   
        Adding file search filter for serving files and queued files.   
        Create queue table and test process handler.   
        Added fontawesome Icons to the build.   
        Refactor status, size and type methods to helper class.   
        Check files if they are already in the queue and add them if not.   
        Handling files to queue and simulated install process.   
        Handling post install process, mark files as installed.   
        Mark files in queue or installed on reload serving files.   
        Update file status on queue, installed and serving when updating file.         

### v2.1.1
#### Handling of serving server files  
        Create Sub directory search option.   
        Add sub directory search with custom walk method.   
        Fix createItem to work with deep folder structure.   
        Add a more detailed error logging on server listen errors.   
        Create dedicated Router for express.   
        Apply Router to express as middleware.  
        Reset Router serving files after reloading server files.   
        Fix getter of current active routes in Server Routes view.   
        Refactor getFiles method handle search in base path and sub directories.   
        Update Server Config fields to make them look prettier.   
        Add file size of to the server files in readable format.   
        Add channel communication between main and server.   
        Add send method globaly to and reducing duplicated code.   
        Optiimzing start up and quick fix double reload of files on start.   
        Commit file status on queue when it changes.         

### v2.1.0
#### All about http Server  
        Creating seperate Server Window for the http stuff.   
        Adding heathbeat endpoint to verify base checkup.   
        Adding server handling methods for start, stop and restarting.   
        Outsourcing base path file scan from app to server.   
        Filtering files by .pkg extension.   
        Load Files at base path and sync with store.   
        Optimize file search and create file item objects with full path.  
        Add proper Server logging of server events.   
        Add Routes View to list all registered routes by the server.         

### v2.0.2
#### Storage sync  
        Fixing vuex-store handling across all windows.   
        Make the storage persistent.   
        Make the settings value sync to the storage (no seperate save required).   
        Loading vuex on application start.         

### v2.0.1
#### Creation time  
        Adding vue-router, -vuex, -vuex-pathify and -router to the depencies.   
        Preparing i18n multi language support but having English only for now.   
        Adding element-ui as css and components framework.   
        Creating custom Layouts for FullScreen and Menu based Views.   
        Creating Router and binding pages with custom layouts.   
        Creating Pages and NavBar to navigate though each view.   
        Creating a Info View with little information and thanks stuff.   
        Creating Store to save application setting values across all renderer processes.   
        Adding PS4 PKG Installler (ps4 pkg) to the misc's to have it ready to download.   
        Fixing window close process and quit the app correctly.   
        Closing windows will not quit the app directly, so server and client should still be running.   
        Adding Error catch route for not found views.   
        Adding Changelogs.   
        Adding Config folder with predefined links for misc stuff.         

### v2.0.0
#### Refactoring  
       Start with the refactoring process.   
       Adding Sass pre-compiler for Styling purposes.   
       Adding Webpack to automate the reloading process (hmr) on file updates.   
       Adding electron-webpack to apply easy webpack config with electron.   
       Adding vue as front-end Framework to work with vDOM instead of html.   
       Creating single file components (SFC) to make components modular.   
       Creating helper file for the main process and outsource BrowserWindow functions.   
       Extending the Menu with Info items.   
       Creating Tray Icon and items.   
       Adding PS Logos to the App and Tray Icon.   
       Change Build command from electron-packer to electron-builder.   
       Testing and fixing stuff for the first prototype production build.      
