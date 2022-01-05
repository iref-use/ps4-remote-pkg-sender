import { app, shell, Menu } from 'electron'
import windows from './index'
import links from './../config/links'

function showProcessingCenter(){
    windows.main.show()
    windows.main.webContents.send('main-route', 'home')
}

function showServerList(){
  windows.main.show()
  windows.main.webContents.send('main-route', 'server')
}

const application = {
  label: "Application",
  submenu: [
      { label: 'Open PS4 Remote PKG Installer', click: () =>  windows.main.show() },
      { label: 'Open Server', click: () => windows.server.show() },
      { label: 'Separator', type: 'separator'},

      // { label: 'Install new PKG' },
      { label: 'Show Processing Center', click: () => showProcessingCenter() },
      { label: 'Show Server listed PKGs', click: () => showServerList() },
      { label: 'Separator', type: 'separator'},

      { label: 'PS4 API Logs', click: () => windows.ps4.show() },

      { label: 'Separator', type: 'separator' },

      {
        label: "Quit",
        accelerator: "Command+Q",
        click: () => { app.quit() }
      },
  ]
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

const help = {
  label: "Help",
  submenu: [
      {
        label: "Info",
        click: () => { windows.info.show() }
      },
      { label: 'Separator', type: 'separator' },
      {
        label: "Changelog",
        click: () => { shell.openExternal(links.changelog) }
      },
      {
        label: "Troubleshooting Guide",
        click: () => { shell.openExternal(links.troubleshoot) } 
      },
      { label: 'Separator', type: 'separator' },
      {
        label: "GitHub",
        click: () => { shell.openExternal(links.github_repo) }
      },
      {
        label: "Report an Issue",
        click: () => { shell.openExternal(links.report_issue) }
      }
  ]
}

const template = [
  application,
  // edit,
  help,
];



export default {
  template,
  createMenu(){
      Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
}
