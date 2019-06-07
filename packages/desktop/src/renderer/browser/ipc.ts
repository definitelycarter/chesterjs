import { ipcRenderer } from 'electron';

export function runSuite(filePath: string) {
  ipcRenderer.send('run-suite', { path: filePath });
}
