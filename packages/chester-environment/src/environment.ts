import { Config } from '@chester/config';

export interface EnvironmentConstructor {
  new (config: Config): Environment;
}
export class Environment {
  // todo - make this a private property
  constructor(public config: Config) {}
}
