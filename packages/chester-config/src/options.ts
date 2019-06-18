export interface Options {
  project?: string;
}

export interface Config {
  root: string;
  project: string;
  host?: string;
  files: string | string[];
  runner: string;
  globals?: () => Object;
  preprocessor?: string;
}
