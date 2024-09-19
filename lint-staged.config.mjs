export default {
  '*.vue': ['prettier --write', 'eslint --cache --fix'],
  '*.{js,ts}': ['prettier --cache --ignore-unknown --write', 'eslint --cache --fix'],
  '*.{scss,html,vue,css}': [
    'prettier --cache --ignore-unknown',
    'stylelint --fix --allow-empty-input'
  ],
  'package.json': ['prettier --cache --write']
}
