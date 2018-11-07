const {app, BrowserWindow} = require('electron');
const Menu = require('electron').Menu
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadFile('index.html');
  //mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createMenu() {
  const application = {
    label: "Application",
    submenu: [{
      label: "Quit",
      accelerator: "Command+Q",
      click: () => {app.quit()}
    }]
  }

  const edit = {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        selector: "undo:"
      },
      {
        label: "Redo",
        accelerator: "Shift+CmdOrCtrl+Z",
        selector: "redo:"
      },
      {
        type: "separator"
      },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        selector: "cut:"
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        selector: "copy:"
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        selector: "paste:"
      },
      {
        label: "Select All",
        accelerator: "CmdOrCtrl+A",
        selector: "selectAll:"
      }
    ]
  };

  const template = [
    application,
    edit
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', function () {
  createWindow();
  createMenu();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
