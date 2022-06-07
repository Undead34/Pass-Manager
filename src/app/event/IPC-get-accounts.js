const fileSystem = require('../app/utils/fileSystem');
const constants = require('../app/utils/constants');
const path = require('path');

module.exports = {
	name: 'get-accounts',
	once: false,
	handle: true,
	async execute(event) {
		try {
			if (await fileSystem.exists(path.join(constants.paths.root, "users.json"))) {
				let data = await fileSystem.readFile(path.join(constants.paths.root, "users.json"));
				let users = JSON.parse(data);
				let accounts = [];
				for (account in users) {
					accounts.push(Buffer.from(users[account].username).toString());
				}
				return accounts;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}