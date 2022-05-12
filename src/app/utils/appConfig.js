const Configuration = require('./config');

var configuration;

const initConfiguration = () => {
  configuration = new Configuration();
}

const getConfiguration = () => {
  return configuration;
}

exports.initConfiguration = initConfiguration;
exports.getConfiguration = getConfiguration;
