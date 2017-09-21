const electron = require('electron')
var server = require('./server');

var app = electron.app;
var Window = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function() {

    mainWindow = new Window({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        resizable: true
    });

    mainWindow.loadURL('http://localhost:3000');

    mainWindow.focus();
});

app.on('window-all-closed', function () {
    app.quit();
});
