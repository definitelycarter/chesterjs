export interface Options {
  project?: string;
}

export interface Config {
  host?: string;
  files: string | string[];
  runner: string;
  root?: string;
  globals?: () => Object;
  preprocessor?: string;
}
