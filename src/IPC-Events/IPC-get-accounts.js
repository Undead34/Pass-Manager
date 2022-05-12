module.exports = {
	name: 'get-accounts',
	once: false,
	handle: true,
	execute(event) {
		console.log(`[IPC] get-accounts: Yes`);
	},
};