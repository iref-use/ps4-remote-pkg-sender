import uaup from 'uaup-js'

const defaultStages = {
    Checking: "Checking For Updates!", // When Checking For Updates.
    Found: "Update Found!",  // If an Update is Found.
    NotFound: "No Update Found.", // If an Update is Not Found.
    Downloading: "Downloading...", // When Downloading Update.
    Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Launching..." // When Launching the Application.
};

const updateOptions = {
    useGithub: true, // {Default is true} [Optional] Only Github is Currenlty Supported.
    gitRepo: "ps4-remote-pkg-sender", // [Required] Your Repo Name
    gitUsername: "gkiokan",  // [Required] Your GitHub Username.
    isGitRepoPrivate: false,  // {Default is false} [Optional] If the Repo is Private or Public  (Currently not Supported).
    gitRepoToken: "",  // {Default is null} [Optional] The Token from GitHub to Access a Private Repo.  Only for Private Repos.

    appName: "uaup-js", //[Required] The Name of the app archive and the app folder.
    appExecutableName: "UAUP JS.exe", //[Required] The Executable of the Application to be Run after updating.

    // appDirectory: "/path/to/application", //{Default is "Application Data/AppName"} [Optional]  Where the app will receide, make sure your app has permissions to be there.
    // versionFile: "/path/to/version.json", // {Default is "Application directory/settings/version.json"} [Optional] The Path to the Local Version File.
    // tempDirectory: "/tmp", // {Default is "Application directory/tmp"} [Optional] Where the Update archive will download to.

    progressBar: null, // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
    label: null, // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
    forceUpdate: false, // {Default is false} [Optional] If the Application should be forced updated.  This will change to true if any errors ocurr while launching.
    stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
};
