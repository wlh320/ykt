const electron = require('electron')
const fetch = require('./fetch.js')

var app = electron.app;
var Window = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var mainWindow = null;

ipcMain.on('fetch-data', (event, arg) => {
  fetch(arg.cookie, arg.sdate, arg.edate, event.sender);
});

app.on('ready', function() {

    mainWindow = new Window({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        resizable: true
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.focus();
});

app.on('window-all-closed', function () {
    app.quit();
});
