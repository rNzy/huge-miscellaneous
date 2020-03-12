// Javascript = utilisation de babel es6 > es5
exports.loadJavaScript = ({
  // mode,
  // include
  // ne pas utiliser l'include cela ne marche pas
  // cela ne transpile pas nos fichiers
  exclude
}) => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // include,

        exclude,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  }
});
