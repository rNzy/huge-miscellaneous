module.exports = {
  '*.{js,jsx,ts,tsx}': [
    './node_modules/.bin/prettier --write',
    './node_modules/.bin/eslint --fix',
    'git add'
  ],
  '*.{scss,css}': [
    './node_modules/.bin/prettier --write',
    './node_modules/.bin/stylelint --fix',
    'git add'
  ],
  '*.{md,json,html}': ['./node_modules/.bin/prettier --write', 'git add']
};
