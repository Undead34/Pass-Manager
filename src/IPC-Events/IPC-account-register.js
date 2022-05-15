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

		register.registerUser(data);		
	},
};