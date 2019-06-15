import yargs from 'yargs';
import { readConfig } from '@chester/config';
import { remote } from 'electron';

const options = {
  project: {
    description:
      'The path of the project.  By default the current working directory is assumed',
    string: true as true,
    type: 'string' as 'string',
  },
};

const args = yargs(remote.process.argv)
  .options(options)
  .help('-h').argv;

export = readConfig(args);
