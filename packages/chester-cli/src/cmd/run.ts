import { InferredOptionTypes } from 'yargs';
import { readConfig } from '@chester/config';
import { BaseOptions } from '../options';

type CommandArguments = typeof builder & typeof BaseOptions;
type Arguments = InferredOptionTypes<CommandArguments> & { dev?: boolean };

export const command = 'run';
export const desc = 'run chester';
export const builder = {};

export function handler(argv: Arguments) {
  const config = readConfig(argv);
  console.log(config);
  return;
}
