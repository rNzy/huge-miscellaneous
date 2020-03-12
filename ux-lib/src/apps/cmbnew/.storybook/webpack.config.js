const defaultConfig = require('../../../../.storybook/webpack.config.default');

module.exports = ({ config, mode }) => {
  return defaultConfig({ config, mode });
};
