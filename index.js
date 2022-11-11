const { app, BrowserWindow, Menu} = require('electron')

let mainWindow
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            puppeteer: true
        }
    })
     mainWindow.loadURL(`file://${__dirname}/index.html`)
    
})  

const templateMenu = [
    {
        label: 'Arquivo',
        submenu: [
        {
        label:'Fechar',
        role:'quit'
    }]

    }
]

//MENU

const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu)