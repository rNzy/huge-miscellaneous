const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.loadHtml = ({ mode, uxEfs }) => {
  if (mode === 'production') {
    return {};
  } else {
    return {
      plugins: [
        new HtmlWebpackPlugin({
          title: 'UX Library',
          filename: 'index.html',
          template: `./src/apps/${uxEfs}/html/index.html`
        }),
        new HtmlWebpackPlugin({
          title: 'UX Library With Menu',
          filename: 'menu.html',
          template: `./src/apps/${uxEfs}/html/menu.html`
        }),
        new HtmlWebpackPlugin({
          title: 'All Web Components',
          filename: 'all.html',
          template: `./src/apps/${uxEfs}/html/all.html`
        })
      ]
    };
  }
};
