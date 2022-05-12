const { BrowserWindow } = require("electron");

module.exports = {
	name: 'hide-window',
	once: false,
	handle: false,
	execute(event) {
		const webContents = event.sender;
		const window = BrowserWindow.fromWebContents(webContents);
		window.hide();
		console.log(`[IPC] Window Hide`);
	},
};