// Eslint just shoves a bunch of errors without this configuration for some reason
// (probably because eslint-testing-library and eslint-cypress have major conflicts)

module.exports = {
  root: true,
  plugins: ['eslint-plugin-cypress'],
  parser: '@typescript-eslint/parser',
  env: { 'cypress/globals': true },
};
