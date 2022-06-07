const { BrowserWindow } = require("electron");

module.exports = {
	name: 'restore-window',
	once: false,
	handle: false,
	execute(event) {
		const webContents = event.sender;
		const window = BrowserWindow.fromWebContents(webContents);
		window.restore();
		console.log(`[IPC] Window Restore`);
	},
};