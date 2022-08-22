const { contextBridge, ipcRenderer } = require('electron')
// OpenFILE dialog is our invocation endpoint
contextBridge.exposeInMainWorld('electronAPI', {
  getPorts: () => ipcRenderer.invoke('dialog:getPorts'),
  openPort: (com_path) => ipcRenderer.send('dialog:openPort', com_path),
  closeApp: () =>  ipcRenderer.invoke('dialog:closeApp'),
  minimizeApp: () =>  ipcRenderer.invoke('dialog:minimizeApp'),
  maximizeApp: () =>  ipcRenderer.invoke('dialog:maximizeApp'),
  openCom: () =>  ipcRenderer.invoke('dialog:openCom'),
  sendMessage: (message) => ipcRenderer.send('dialog:sendMessage', message)
})

 