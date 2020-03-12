// Créé un sprite avec les icones SVG du projet
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

exports.svgSprite = () => {
  return {
    module: {
      rules: [
        {
          test: /\.svg$/, // your icons directory
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: './assets/images/icons.svg' // this is the destination of your sprite sheet
              }
            },
            {
              loader: 'svgo-loader',
              options: {
                multipass: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          id: 'uxlibsvg'
        }
      })
    ]
  };
};
