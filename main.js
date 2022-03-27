const electron = require('electron')
const url = require('url')
const path = require('path')


const{app, BrowserWindow} = electron;


const createWindow = () => {
  const win = new BrowserWindow({
    width:800,
    height:600,
    webPreferences: 
    {
      nodeIntegration: true, // to allow require
      contextIsolation: false, // allow use with Electron 12+
      // Join the current dir with preload script
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}

// Allow live code updates
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

// When electron is ready
app.whenReady().then(() => {
  createWindow()
  

  // For MAC support
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length==0) createWindow
  })
})

// Listen for window closed on Windows and Linux
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit()
})




