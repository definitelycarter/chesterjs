import { InferredOptionTypes } from 'yargs';
import { run } from '@chester/http-server';
import console = require('console');

export const command = 'serve';
export const desc = 'serve chester in an http environment';
export const builder = {
  project: {
    description: 'The path of the project.',
    default: '.',
  },
  port: {
    description: 'The port in which to serve the test runner',
    default: 3000,
  },
};

export async function handler(argv: InferredOptionTypes<typeof builder>) {
  try {
    await run(argv);
    console.log('chester is listening on port ' + argv.port);
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
}
