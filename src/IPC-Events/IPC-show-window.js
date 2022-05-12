const { BrowserWindow } = require("electron");

module.exports = {
	name: 'show-window',
	once: false,
	handle: false,
	execute(event) {
		const webContents = event.sender;
		const window = BrowserWindow.fromWebContents(webContents);
		window.show();
		console.log(`[IPC] Window Show`);
	},
};