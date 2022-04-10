const { contextBridge, ipcRenderer } = require('electron')

// OpenFILE dialog is our invocation endpoint
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})