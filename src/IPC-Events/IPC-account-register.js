const register = require("../app/accounts/register");

module.exports = {
	name: 'account-register',
	once: false,
	handle: true,
	execute(event, data) {
		console.log(`[IPC] Register`);
	},
};