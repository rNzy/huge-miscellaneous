const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const modeConfig = ({
  mode,
  port,
  host,
  distFolder
  // broswers
}) =>
  require(`./build-utils/webpack.${mode}`)({
    mode,
    port,
    host,
    distFolder
    // broswers,
  });

const presetsConfig = require('./build-utils/loadPresets');

const js = require('./build-utils/parts/load-js');
const svg = require('./build-utils/parts/svg-sprite');
const img = require('./build-utils/parts/load-images');
const fonts = require('./build-utils/parts/load-fonts');
const styles = require('./build-utils/parts/load-styles.js');
const html = require('./build-utils/parts/load-html.js');

const { uxEfs } = process.env;

module.exports = ({
  mode = 'production',
  presets = [],
  port,
  host
  // broswers = 'modern'
}) => {
  const uxEfsOldStyle = uxEfs === 'cmbnew' ? 'cmb' : uxEfs;
  const distFolder = uxEfs === 'cmbnew' ? 'cmb' : uxEfs;

  return webpackMerge(
    {
      mode,
      entry: path.resolve(__dirname, `src/apps/${uxEfs}/index.js`),
      plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
          uxEfs: JSON.stringify(uxEfsOldStyle),
          'process.env.uxEfs': uxEfsOldStyle
        })
      ],
      stats: {
        children: false // remove mini-css-extract-plugin logs when building
      },
      resolve: {
        modules: [
          path.resolve(__dirname + '/src'),
          path.resolve(__dirname + '/node_modules')
        ]
      }
    },
    styles.loadStyles({
      mode,
      uxEfs: uxEfsOldStyle
      // broswers
    }),
    js.loadJavaScript({
      exclude: /node_modules/,
      // include: path.resolve(__dirname, '/src'), ne pas utiliser sinon pas de transpilation
      mode
    }),
    svg.svgSprite({
      mode
    }),
    img.loadImages({
      mode,
      port
    }),
    fonts.loadFonts({
      mode,
      port
    }),
    html.loadHtml({
      mode,
      uxEfs
    }),
    modeConfig({
      mode,
      port,
      host,
      distFolder
      // broswers
    }),
    presetsConfig({
      mode,
      presets
    })
  );
};
