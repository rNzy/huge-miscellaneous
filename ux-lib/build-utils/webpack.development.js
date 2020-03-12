const path = require('path');
const exec = require('child_process').exec;

module.exports = ({ port = 7000, host = '0.0.0.0' }) => {
  return {
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, '..', 'dist', process.env.uxEfs), // eslint-disable-line
      compress: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      useLocalIp: true,
      disableHostCheck: true,
      host,
      open: false,
      port
      // Afficher le port lorsque le serveur commence l'écoute
      // onListening: function(server) {
      //   // port = server.listeningApp.address().port;
      //   // eslint-disable-next-line no-console
      //   //console.log(`http://localhost:${port}`);
      // }
    },
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].lazy-chunk.js'
    },
    plugins: [
      {
        // Afficher le port lorsque le serveur build
        apply: compiler => {
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
            exec(
              `echo "\\e[1m\\e[34mhttp://localhost:${port}\\033[0m"`,
              (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
              }
            );
          });
        }
      }
    ]
  };
};
