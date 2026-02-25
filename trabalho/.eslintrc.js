module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 100 }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
