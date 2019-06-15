import { Options, Config } from './options';
import * as path from 'path';

export function readConfig(options: Options): Config {
  const root = options.project || '.';
  const cfgPath = path.resolve(`${root}/chester.config`);
  const config: Config = require(cfgPath);

  if (config.root) {
    config.root = path.resolve(root, config.root);
  } else {
    config.root = root;
  }

  return config;
}
