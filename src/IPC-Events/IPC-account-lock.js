module.exports = {
	name: 'account-lock',
	once: false,
	handle: true,
	execute(event) {
		console.log(`[IPC] get-accounts: Yes`);
	},
};