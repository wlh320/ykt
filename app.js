const electron = require('electron')
const fetch = require('./fetch.js')
const app = electron.app;
const Window = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const session = electron.session;

var mainWindow = null;
var loginWindow = null;

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

ipcMain.on('fetch-data', (event, arg) => {
    fetch(arg.cookie, arg.sdate, arg.edate, event.sender);
});

ipcMain.on('login', (event, arg) => {
    loginWindow = new Window( {
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        resizable: true
    });
    loginWindow.loadURL('http://yikatong.tongji.edu.cn/Saml/Forlogon')
    session.defaultSession.clearStorageData(); // clear cookie
    loginWindow.on('page-title-updated', () => {
        if (loginWindow.getTitle() === 'Tongji University Login') {
            session.defaultSession.cookies.get({'name':'hallticket'}, function(error, cookies) {
                if (cookies.length != 0) {
                    var hallticket = cookies[0].value;
                    event.sender.send('hallticket', {code:'200', ht:hallticket}); 
                    loginWindow.close();
                } else {
                    event.sender.send('hallticket', {code:'404', ht: '获取失败,请点击重试'});
                    loginWindow.close();
                }
            });
        }
    });
});
