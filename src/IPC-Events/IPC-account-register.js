const register = require("../app/accounts/register");

module.exports = {
	name: 'account-register',
	once: false,
	handle: true,
	execute(event, data) {
		console.log(`[IPC] is registering the user ${data.username}`);
		console.log(`[IPC] with the password ${data.password}`);
		console.log(`[IPC] with the algorithm ${data.algorithm}`);
		console.log(`[IPC] with the key length ${data.keyLength}`);
		console.log(`[IPC] with the operation mode ${data.operationMode}`);
		console.log(`[IPC] with the kdf ${data.kdf}`);

		register.userExists(data.username)
			.then(exists => {
				if (exists) {
					event.sender.send('account-register-response', { success: false, error: 'Username already exists', error_code: "UAE" });
				} else {
					register.registerUser(data);
				}
			})
			.catch(err => { event.sender.send('account-register-response', { success: false, error: err, error_code: "ERR" }); })
	},
};
