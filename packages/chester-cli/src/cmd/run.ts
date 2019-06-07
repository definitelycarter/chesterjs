import { InferredOptionTypes } from 'yargs';

export const command = 'run';
export const desc = 'run chester';
export const builder = {
  project: {
    description: 'The path of the project.',
    default: '.',
  },
  environment: {
    alias: 'e',
    default: 'headless',
    description: 'The environment in which to run chester',
    type: 'string' as 'string',
    choices: ['headless', 'jsdom'],
  },
};

export function handler(argv: InferredOptionTypes<typeof builder>) {
  return;
}
