import { InferredOptionTypes } from 'yargs';

export const BaseOptions = {
  project: {
    description: 'The path of the project.',
    default: '.',
  },
};

export type BaseArguments = InferredOptionTypes<typeof BaseOptions>;
