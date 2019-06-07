const webpack = require('webpack');

module.exports = output => file => {
  const compiler = webpack({
    mode: 'development',
    entry: file,
    output,
  });

  return new Promise((resolve, reject) => {
    compiler.run(err => {
      if (err) return reject(err);
      resolve();
    });
  });
};
