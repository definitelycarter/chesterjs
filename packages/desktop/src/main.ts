import { app, BrowserWindow } from 'electron';
import path from 'path';

require('electron-reload')('./src', {
  electron: path.resolve('node_modules', '.bin', 'electron'),
  // argv: process.argv.slice(1),
  // forceHardReset: true,
});
let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile(path.resolve('static/browser.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
