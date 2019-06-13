import child_process from 'child_process';
import path from 'path';
import { InferredOptionTypes } from 'yargs';
type Arguments = InferredOptionTypes<typeof builder & { dev?: boolean }>;

export const command = 'open';
export const desc = 'open a project';
export const builder = {
  project: {
    description: 'The path of the project.',
    default: '.',
  },
};

export function handler(argv: Arguments) {
  const binaryArguments = getArguments(argv);
  child_process.spawn(binaryArguments.join(' '), {
    windowsHide: false,
    stdio: 'inherit',
    shell: true,
  });
}

function getArguments(argv: Arguments) {
  const { dev, ...rest } = argv;
  if (dev) {
    return [
      require('electron'),
      path.resolve('packages/desktop'),
      `--project=${rest.project}`,
    ];
  } else {
    throw new Error('We only support dev');
  }
}
