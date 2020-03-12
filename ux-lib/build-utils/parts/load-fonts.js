// Images
exports.loadFonts = ({ mode, port }) => {
  if (mode === 'production') {
    return {
      module: {
        rules: [
          {
            test: /\.(woff|woff2)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: './assets/fonts/',
                  publicPath: './assets/fonts/'
                }
              }
            ]
          }
        ]
      }
    };
  }
  return {
    module: {
      rules: [
        {
          test: /\.(woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './assets/images/',
                publicPath: `http://localhost:${port}/assets/fonts/`
              }
            }
          ]
        }
      ]
    }
  };
};
