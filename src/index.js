const config = require("./app/config/config.js");
const LogServiceLocal = require("./app/error/log");
const { } = require("electron");
const path = require("path");

// Developer mode for more info in console
if (process.argv.includes("--development")) {
  console.log('\x1b[31m%s\x1b[0m', 'Warning you are in development mode');
  require('electron-reload')(__dirname);
  config.set("development", true);
  config.set("log", {
    level: 4,
    console: true,
  });
}

const main = async function() {
  const log = new LogServiceLocal(config.getConfig());
  log.init();
}

main();

// // Browser window config
// let browserWindowConfig = {
//   width: 800,
//   height: 600,
//   show: false,
//   frame: false,
//   minHeight: 430,
//   minWidth: 580,
//   webPreferences: {
//     nodeIntegration: false,
//     contextIsolation: true,
//     enableRemoteModule: false,
//     preload: path.join(__dirname, 'preload.js')
//   },
// }

// // Main window
// let mainWindow;

// // IPC main events listeners
// const listenEvents = async () => {
//   const eventFiles = (await fileSystem.listFiles(path.join(__dirname, 'src/IPC-Events'))).filter(file => file.endsWith('.js'));

//   for (const file of eventFiles) {
//     const event = require(`./src/IPC-Events/${file}`);
//     if (event.once) {
//       if (event.handle) ipcMain.handleOnce(event.name, (...args) => event.execute(...args));
//       else ipcMain.once(event.name, (...args) => event.execute(...args));
//     } else {
//       if (event.handle) ipcMain.handle(event.name, (...args) => event.execute(...args));
//       else ipcMain.on(event.name, (...args) => event.execute(...args));
//     }
//     delete require.cache[require.resolve(`./src/IPC-Events/${file}`)]; // delete cache
//   }

//   return true;
// }

// // Create main window and load the index.html
// const createWindow = async () => {
//   mainWindow = new BrowserWindow(browserWindowConfig);
//   mainWindow.loadFile("./src/views/index.html");
//   if (await listenEvents()) console.log("Events loaded successfully");
//   onStartup();
// }

// // If open other instance of the app, show the first instance or reload if error
// app.addListener("second-instance", () => {
//   if (mainWindow) { mainWindow.show(); }
//   else { app.relaunch() }
// })

// // When the app is ready, create the main window and close second instance
// if (app.requestSingleInstanceLock() === false) {
//   console.log("Another instance is already running.");
//   app.quit();
// } else {
//   app.on("ready", createWindow);
//   app.on("window-all-closed", () => {
//     if (process.platform !== "darwin") app.quit();
//   });
// }




// // // Capture all errors and write them to the log file
// // process.addListener("uncaughtException", (err) => {
// //   logger.warn(err);
// //   dialog.showErrorBox("Error", err);
// //   process.exit(1);
// // });

// // // Capture all rejections and write them to the log file
// // process.addListener("unhandledRejection", (reason) => {
// //   logger.error(reason);
// //   console.log(reason)
// //   if (app.isReady()) {
// //     dialog.showErrorBox("Error", reason.toString());
// //   }
// //   else {
// //     dialog.showErrorBox("Error", reason);
// //     process.exit(1);
// //   }
// // });
