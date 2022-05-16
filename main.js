const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");
const { SerialPort, ReadlineParser } = require('serialport')
let installExtension, REACT_DEVELOPER_TOOLS

const port = new SerialPort({ path: 'COM3', baudRate: 115200 })
var message = ""

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
} // NEW!

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
} // NEW!

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// IPC Two Way
async function handleFileOpen()
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
    console.log("Returning ports")
    return ports
  })
  return portamento
}


async function initialisePort()
{
  port = new SerialPort({
    autoOpen: false,
    path: '\\\\.\\COM3',
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

async function openPort(isopen)
{ 
  console.log("Returning port")
  if(isopen == false)
  {
    await initialisePort()
  }
  return port
}

async function openCom()
{
  console.log("Com is open")
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
  parser.on('data', logfun)
  return message
}

function logfun(msg)
{
  message = msg
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // IPC Two-way
  listSerialPorts()
  //openPort(false)
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('dialog:openPort', openPort)
  ipcMain.handle('dialog:openCom', openCom)

  createWindow();
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`));
  }
}); // UPDATED!


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
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
