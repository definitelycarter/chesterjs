import fs from 'fs';
import glob from 'glob';
import * as path from 'path';
import { Config } from '@chester/config';

export function resolveFiles({
  files,
  root,
  project,
}: Config): Promise<Folder> {
  let promise: Promise<string[]>;
  if (Array.isArray(files)) {
    promise = files.reduce((promise, file) => {
      return promise.then(files => {
        return resolvePattern(root!, file).then(matches => {
          return files.concat(matches);
        });
      });
    }, Promise.resolve<string[]>([]));
  } else if (typeof files === 'string') {
    promise = resolvePattern(root!, files).then(matches => {
      return matches;
    });
  } else {
    throw new Error('Invalid property "files" found in config');
  }

  const folder: Folder = {
    name: path.basename(project),
    path: root,
    folders: [],
    files: [],
  };
  return promise.then(files => {
    const applyHierarchy = hierarchyBuilder(folder);
    applyHierarchy(files);
    return folder;
  });
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

export interface Folder {
  name: string;
  path: string;
  files: File[];
  folders: Folder[];
}

export interface File {
  name: string;
  path: string;
}

const hierarchyBuilder = (root: Folder) => (files: string[]) => {
  function ensureFolder(parts: string[]): Folder {
    let subFolder: Folder = root;
    parts.forEach((part, i) => {
      const subParts = parts.slice(0, i + 1);
      const filePath = subParts.join(path.sep);
      let folder = subFolder.folders.find(f => f.path === filePath);
      if (!folder) {
        folder = {
          name: part,
          path: filePath,
          folders: [],
          files: [],
        };
        subFolder.folders.push(folder);
      }
      subFolder = folder;
    });
    return subFolder;
  }

  function processFile(filePath: string) {
    const trimmed = path.relative(root.path, filePath);
    const parts = trimmed.split(path.sep);
    parts.forEach((part, index) => {
      const subParts = parts.slice(0, index + 1);
      let filePath = subParts.join(path.sep);
      let stat = fs.lstatSync(path.resolve(root.path, filePath));
      if (stat.isDirectory()) {
        ensureFolder(subParts);
      } else {
        let folder = ensureFolder(subParts.slice(0, index));
        folder.files.push({ name: part, path: filePath });
      }
    });
  }

  files.forEach((filePath: string) => {
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) return;
    processFile(filePath);
  }, []);
};
