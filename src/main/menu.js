import { app } from 'electron'

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

const help = {
  label: "Info",
  submenu: [
      {
        label: "Version",
      },
      {
        label: 'Separator',
        type: 'separator'
      },
      {
        label: "GitHub",
      },
      {
        label: "Report an Issue",
      }
  ]
}

const template = [
  application,
  edit,
  help,
];

export default template
