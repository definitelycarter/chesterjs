import { Config, Options, readConfig } from '@chester/config';
import { resolveFiles } from './resolver';
// import { Runner } from '@chester/runner';
// import { Runtime } from '@chester/runtime';
// import { Environment } from '@chester/environment-node';

export function run(options: Options) {
  const config = readConfig(options);
  resolveFiles(config).then(matches => {
    matches.forEach(match => {
      loadAndRunTest(match, config);
    });
  });
}

export async function loadAndRunTest(file: string, config: Config) {
  // const runtime = new Runtime(config, Environment);
  // runtime.runTest(file);
}
