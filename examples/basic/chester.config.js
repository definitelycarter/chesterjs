module.exports = {
  preprocessor: './scripts/preprocessor.js',
  runner: '@chester/runner-mocha',
  files: ['**/__tests__/*.*'],
  globals: () => ({}),
};
