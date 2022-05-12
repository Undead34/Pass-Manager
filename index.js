// @ts-check

const { app, BrowserWindow, ipcMain } = require("electron");
const fileSystem = require("./src/app/utils/fileSystem");
const onStartup = require("./src/app/utils/onStartup");
const path = require("path");

if (process.argv.includes("--development")) {
	console.log("DEVELOPMENT MODE ACTIVE");
	// @ts-ignore
	require('electron-reload')(__dirname);
}

let browserWindowConfig = {
	width: 800,
	height: 600,
	// show: false,
	// frame: false,
	minHeight: 430,
	minWidth: 580,
	webPreferences: {
		nodeIntegration: false,
		contextIsolation: true,
		enableRemoteModule: false,
		preload: path.join(__dirname, 'preload.js')
	},
}

// IPC main events listener
const listenEvents = async () => {
	const eventFiles = (await fileSystem.listFiles('./src/IPC-Events')).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const event = require(`./src/IPC-Events/${file}`);
		if (event.once) {
			if (event.handle) ipcMain.handleOnce(event.name, (...args) => event.execute(...args));
			else ipcMain.once(event.name, (...args) => event.execute(...args));
		} else {
			if (event.handle) ipcMain.handle(event.name, (...args) => event.execute(...args));
			else ipcMain.on(event.name, (...args) => event.execute(...args));
		}
		delete require.cache[require.resolve(`./src/IPC-Events/${file}`)]; // delete cache
	}

	return true;
}

const createWindow = async () => {
	const mainWindow = new BrowserWindow(browserWindowConfig);
	mainWindow.loadFile("./src/views/index.html");
	if (await listenEvents()) console.log("Events loaded successfully");
	onStartup();
}

if (app.requestSingleInstanceLock() === false) {
	console.log("Another instance is already running.");
	app.quit();
} else {
	app.on("ready", createWindow);
	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") app.quit();
	});
}
