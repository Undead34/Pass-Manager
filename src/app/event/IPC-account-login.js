const login = require("../app/accounts/login");

module.exports = {
	name: 'account-login',
	once: false,
	handle: true,
	execute(event, data) {
		login.userExists(data.username).then((exists) => {
			if (exists) {
				login.createLogin(data);
			} else {
				event.sender.send('account-login-response', { success: false, error: 'Username not exists', error_code: "UNE" });
			}
		})
	},
};