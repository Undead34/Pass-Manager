const { BrowserWindow } = require("electron");

module.exports = {
	name: 'maximize-window',
	once: false,
	handle: false,
	execute(event) {
		const webContents = event.sender;
		const window = BrowserWindow.fromWebContents(webContents);
		window.maximize();
		console.log(`[IPC] Window Maximize`);
	},
};