const register = require("../app/accounts/register");

module.exports = {
	name: 'account-register',
	once: false,
	handle: true,
	execute(event, data) {
		register.registerUser(data[0], data[1]).then(result => {
			event.sender.send("account-register-result", result);
		});
	}
};
