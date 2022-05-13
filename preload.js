const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
  send: (channel, data) => {
    const validChannels = { "PASSMANAGER::SHOW/HIDE": { dataType: ["string"] }, }
    if (validChannels.hasOwnProperty(channel)) {
      if (validChannels[channel].dataType.includes(typeof data)) {
        ipcRenderer.send(channel, data)
      } else {
        console.log(`invalid type of data ${typeof data}`) // IF DEV MODE
      }
    }
  },

  receive: (channel, func) => {
    const validChannels = []
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },

  invoke: (channel, data) => {
    const validChannels = {
      "PASSMANAGER::GetAccountList": { dataType: ["undefined"] },
      "PASSMANAGER::CreateAccount": {
        dataType: ["object"]
      }
    }
    if (validChannels.hasOwnProperty(channel)) {
      if (validChannels[channel].dataType.includes(typeof data)) {
        return ipcRenderer.invoke(channel, data);
      } else {
        console.log(`invalid type of data ${typeof data}`) // IF DEV MODE
      }
    }
  },

  send_2: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  invoke_2: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },
})
