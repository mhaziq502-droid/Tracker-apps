// Preload runs in an isolated context and exposes a minimal, safe API to the
// renderer. The renderer never touches Node APIs directly.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('awsLearning', {
  getStore: () => ipcRenderer.invoke('store:get'),
  setStore: (data) => ipcRenderer.invoke('store:set', data),
  fetchUrl: (url) => ipcRenderer.invoke('net:fetch', url),
  openExternal: (url) => ipcRenderer.invoke('shell:open', url),
});
