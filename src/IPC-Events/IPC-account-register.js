const register = require("../app/accounts/register");

module.exports = {
	name: 'account-register',
	once: false,
	handle: true,
	execute(event, data, options) {
		register.registerUser(data, options).then(result => {
			event.sender.send("account-register-result", result);
		});
	}
};
