import { Config } from '@chester/config';
import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/suites/*', async (req, res) => {
  const config: Config = req.app.get('chester-config');
  if (!config.root) {
    res.status(500);
    return res.send('The root was not set on the config');
  }

  const suite = req.params['0'];
  let source = path.resolve(config.root, suite);
  let dest = source;
  if (config.preprocessor) {
    const outDir = path.resolve(config.root, '.cache');
    dest = path.resolve(outDir, 'main.js');
    const p = require.resolve(config.preprocessor, {
      paths: [config.root],
    });
    const fn = require(p);
    try {
      await fn({ path: outDir, filename: 'main.js' })(source);
    } catch (e) {
      console.error(e);
      res.end(500);
    }
  }
  res.sendFile(dest);
});

export default router;
