const register = require("../app/accounts/register");

module.exports = {
	name: 'account-register',
	once: false,
	handle: true,
	execute(event, data) {
		register.userExists(data.username)
			.then(exists => {
				if (exists) {
					event.sender.send('account-register-response', { success: false, error: 'Username already exists', error_code: "UAE" });
				} else {
					register.registerUser(data).then(success => {
						event.sender.send('account-register-response', { success, error: null, error_code: null });
					})
						.catch(error => {
							event.sender.send('account-register-response', { success: false, error: error.message, error_code: error.code });
						})
				}
			})
			.catch(err => { event.sender.send('account-register-response', { success: false, error: err, error_code: "ERR" }); })
	},
};
