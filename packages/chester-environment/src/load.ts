import { EnvironmentConstructor } from './environment';
import { Config } from '@chester/config';

export async function load(config: Config, env: 'electron' | 'browser') {
  const Environment: EnvironmentConstructor = require(`@chester/environment-${env}`);
  const environment = new Environment(config);
  return environment;
}
