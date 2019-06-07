import { InferredOptionTypes } from 'yargs';

export const command = 'open';
export const desc = 'open a project';
export const builder = {
  project: {
    description: 'The path of the project.',
    default: '.',
  },
};

export function handler(argv: InferredOptionTypes<typeof builder>) {
  return;
}
