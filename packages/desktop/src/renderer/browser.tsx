import { resolveFiles, Folder } from '@chester/chester';
import { Config } from '@chester/config';
import { Browser as BrowserComponent } from '@chester/ui';
import fs from 'fs';
import path from 'path';
import React, { useEffect, useState } from 'react';
interface BrowserProps {
  config: Config;
}
export function Browser(props: BrowserProps) {
  const [folder, setFolder] = useState<Folder>();

  useEffect(() => {
    async function load() {
      let root: Folder = {
        name: path.basename(props.config.root!),
        path: path.resolve(props.config.root!),
        folders: [],
        files: [],
      };
      const files = await resolveFiles(props.config);
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
      setFolder(root);
      console.log(root);
    }
    load();
  }, [props.config]);

  if (!folder) return null;
  return <BrowserComponent folder={folder} />;
}
