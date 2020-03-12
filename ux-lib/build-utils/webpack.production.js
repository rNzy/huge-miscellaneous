const path = require('path');
const webpack = require('webpack');

module.exports = ({
  distFolder
  // broswers
}) => {
  return {
    devtool: 'false',
    output: {
      path: path.resolve(__dirname, '..', 'dist', distFolder), // eslint-disable-line
      // filename: `bundle_${broswers}.js`
      filename: `bundle.js`
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin() // don't create a file if error on compilation
    ],
    optimization: {
      nodeEnv: 'production',
      minimize: true
    }
  };
};
