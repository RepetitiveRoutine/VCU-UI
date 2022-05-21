const { contextBridge, ipcRenderer } = require('electron')
// OpenFILE dialog is our invocation endpoint
contextBridge.exposeInMainWorld('electronAPI', {
  getPorts: () => ipcRenderer.invoke('dialog:getPorts'),
  openPort: () => ipcRenderer.invoke('dialog:openPort'),
  openCom: () =>  ipcRenderer.invoke('dialog:openCom'),
  sendMessage: () => ipcRenderer.invoke('dialog:sendMessage')
})

