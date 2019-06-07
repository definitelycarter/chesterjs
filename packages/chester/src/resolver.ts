import glob from 'glob';
import * as path from 'path';
import { Config } from '@chester/config';

export function resolveFiles({ files, root }: Config): Promise<string[]> {
  if (Array.isArray(files)) {
    return files.reduce((promise, file) => {
      return promise.then(files => {
        return resolvePattern(root!, file).then(matches => {
          return files.concat(matches);
        });
      });
    }, Promise.resolve<string[]>([]));
  } else if (typeof files === 'string') {
    return resolvePattern(root!, files).then(matches => {
      return matches;
    });
  }
  throw new Error('Invalid property "files" found in config');
}

function resolvePattern(
  project: string,
  filePattern: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const pattern = path.resolve(project, filePattern);
    glob(pattern, (e, matches) => {
      if (e) return reject(e);
      resolve(matches);
    });
  });
}
