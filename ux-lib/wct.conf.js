module.exports = {
  npm: true,
  verbose: true,
  plugins: {
    local: {
      browsers: ['chrome'],
      browserOptions: {
        chrome:
          process.env === 'PRODUCTION'
            ? ['headless', 'disable-gpu', 'no-sandbox']
            : []
      }
    },
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov', 'cobertura'],
      include: ['**/*.js'],
      exclude: ['/polymer/polymer.js', '/platform/platform.js']
    }
  },
  wctPackageName: 'wct-browser-legacy'
};
