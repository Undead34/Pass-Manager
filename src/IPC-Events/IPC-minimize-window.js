const { BrowserWindow } = require("electron");

module.exports = {
	name: 'minimize-window',
	once: false,
	handle: false,
	execute(event) {
		const webContents = event.sender;
		const window = BrowserWindow.fromWebContents(webContents);
		window.minimize();
		console.log(`[IPC] Window Minimize`);
	},
};