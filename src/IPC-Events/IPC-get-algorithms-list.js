const path = require("path");
const fileSystem = require('../app/utils/fileSystem');

module.exports = {
	name: 'get-algorithms-list',
	once: false,
	handle: true,
	async execute (event) {
    try {
      let algorithms = await fileSystem.loadJsonFile(path.join(__dirname, "../app/crypto/algorithms.json"));
      return algorithms;
    } catch (error) {
      console.log(error);
      return false;
    }
	},
};