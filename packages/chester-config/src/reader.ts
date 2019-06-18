import { Options, Config } from './options';
import * as path from 'path';

export function readConfig(options: Options): Config {
  const project = options.project || '.';
  const cfgPath = path.resolve(`${project}/chester.config`);
  const config: Config = require(cfgPath);
  config.project = project;
  if (config.root) {
    config.root = path.resolve(project, config.root);
  } else {
    config.root = path.resolve(project);
  }
  return config;
}
