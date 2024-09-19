export default {
  '*.vue': ['prettier --write', 'eslint --cache --fix'],
  '*.{js,ts}': ['prettier --cache --ignore-unknown --write', 'eslint --cache --fix'],
  'package.json': ['prettier --cache --write']
}
