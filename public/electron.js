const path = require("path");
var electron = require("electron");
const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require("electron");
const isDev = require("electron-is-dev");
const { SerialPort, ReadlineParser } = require('serialport')
let installExtension, REACT_DEVELOPER_TOOLS
var port = null 
let window;

if (require("electron-squirrel-startup")) {
  app.quit();
} 

function createWindow() {
  // Create the browser window.

  const win = new electron.BrowserWindow({
    width: 900,
    height: 650,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, '/preload.js')
    }
  }); 

  ipcMain.on('dialog:openPort', async (event, com_path) => {
    await openPort(com_path)
  })
  
  ipcMain.on('dialog:sendMessage', (event, message) => {
    sendMessage(message)
  })



  // and load the index.html of the app.
  // win.loadFile("index.html");
  
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  return win
}


// IPC Two Way
async function getPorts()
{ 
  ports = await listSerialPorts()
  console.log("The ports " + ports)
  return ports
}

async function listSerialPorts() {
  portamento = await SerialPort.list().then((ports, err) => {
    if (ports.length === 0) {
      console.log("No ports :/")
    }
    console.log(ports)
    return ports
  })
  return portamento
}


async function initialisePort(com_path)
{
  port = new SerialPort({
    autoOpen: false,
    path: com_path,
    baudRate: 115200,
    parity: 'none',
    stopBits: 1,
    dataBits: 8
  })

  port.open(function (err) {
    if (err) {
      console.log('Error opening port: ', err.message)
    }
  });
}

async function openPort(com_path)
{ 
  console.log("Returning port")
  console.log("TEH COM PAT HIS " + com_path)
  await initialisePort(com_path)
  
  // Port is global var
}

async function openCom()
{
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
  parser.on('data', logfun)
  console.log(message)
  return message
}

function logfun(msg)
{
  message = msg
}

function sendMessage(message)
{
  port.write(message)
  console.log(message + " sent")
}


function closeApp()
{
  window.close()
}


function minimizeApp()
{
  window.minimize()
}

function maximizeApp()
{
  if(window.isMaximized())
  {
    window.unmaximize()
  }
  else{
    window.maximize()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  window = createWindow();
  
  // IPC Two-way
  listSerialPorts()
  //openPort(false)
  console.log("here")
  ipcMain.handle('dialog:getPorts', getPorts)
  ipcMain.handle('dialog:sendMessage', sendMessage)
  ipcMain.handle('dialog:openPort', openPort)
  ipcMain.handle('dialog:openCom', openCom)
  ipcMain.handle('dialog:closeApp', closeApp)
  ipcMain.handle('dialog:minimizeApp', minimizeApp)
  ipcMain.handle('dialog:maximizeApp', maximizeApp)


  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`));
  }
}); // UPDATED!


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.