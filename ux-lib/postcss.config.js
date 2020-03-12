module.exports = {
  plugins: [
    require('postcss-import')(),
    require('autoprefixer')({
      grid: 'autoplace'
    }),
    require('stylelint')(),
    require('cssnano')
  ]
};
