import yargs from 'yargs';
import { run as runChester } from '@chester/chester';

export function run() {
  const argv = buildYargs();
  try {
    runChester(argv);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function buildYargs() {
  return yargs(process.argv)
    .options(options)
    .help('-h').argv;
}

const options = {
  project: {
    description:
      'The path of the project.  By default the current working directory is assumed',
    string: true as true,
    type: 'string' as 'string',
  },
};
