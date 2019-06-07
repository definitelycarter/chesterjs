import { Options, Config } from './options';
import * as path from 'path';

export function readConfig(options: Options): Config {
  const root = options.project || '.';
  const cfgPath = path.resolve(`${root}/chester.config`);
  const config: Config = require(cfgPath);
  config.root = root;
  return config;
}
