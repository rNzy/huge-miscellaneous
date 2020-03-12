const ImageminPlugin = require('imagemin-webpack');

// eslint-disable-next-line max-lines-per-function
exports.loadImages = ({ mode, port }) => {
  if (mode === 'production') {
    return {
      module: {
        rules: [
          {
            test: /\.(png|jpg|jpeg|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: './assets/images/',
                  publicPath: './assets/images/'
                }
              },
              {
                loader: ImageminPlugin.loader,
                options: {
                  bail: false, // Ignore errors on corrupted images
                  cache: true,
                  imageminOptions: {
                    plugins: [
                      ['gifsicle', { interlaced: true }],
                      ['jpegtran', { progressive: true }],
                      ['optipng', { optimizationLevel: 5 }]
                    ]
                  }
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
          test: /\.(png|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './assets/images/',
                publicPath: `http://localhost:${port}/assets/images/`
              }
            }
          ]
        }
      ]
    }
  };
};
