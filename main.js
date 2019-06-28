const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//Listen for app to be ready

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  //load html into window;
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'mainWindow.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  //Build Menu Template;
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
});
//Handle Create Add window

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item',
    webPreferences: {
      nodeIntegration: true
    }
  });
  //load html into window;
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'addWindow.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  //Quit app when closed
  mainWindow.on('closed', function() {
    app.quit();
  });
}

//Create Menu Template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createWindow();
        }
      },
      {
        label: 'Clear Item'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];
