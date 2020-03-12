const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

exports.loadStyles = ({
  mode,
  uxEfs
  //broswers,
}) => {
  return {
    module: {
      rules: [
        {
          test: /(core\/styles|apps).*\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                sourceMap: mode !== 'production',
                url: true
              }
            },
            {
              loader: 'postcss-loader' // translates CSS into CommonJS
            }
          ]
        },
        {
          test: /((libraries|core\/mixins|core\/components|deprecated)).*\.css$/,
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                sourceMap: false,
                url: true
              }
            },
            {
              loader: 'postcss-loader' // translates CSS into CommonJS
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                sourceMap: mode !== 'production',
                url: true
              }
            },
            {
              loader: 'postcss-loader' // translates CSS into CommonJS
              // options: {
              //   sourceMap: false,
              //   url: false
              // }
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
              options: {
                sassOptions: {
                  includePaths: [__dirname, 'src/deprecated/assets/scss'], // eslint-disable-line
                  url: false
                },
                sourceMap: mode !== 'production',
                prependData:
                  '$uxEfs: ' +
                  uxEfs + // eslint-disable-line
                  ';' +
                  '@import "src/deprecated/assets/scss/_utils_' +
                  uxEfs + // eslint-disable-line
                  '.scss' +
                  '";'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new StyleLintPlugin({ syntax: 'scss' }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        // filename: `style_${broswers}.css`,
        filename: `style.css`,
        chunkFilename: '[id].css'
      })
    ]
  };
};
