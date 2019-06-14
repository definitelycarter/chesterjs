import React from 'react';
import ReactDOM from 'react-dom';
import { Browser } from '@chester/ui';
import path from 'path';

const location = require.resolve('@chester/ui');
const style = document.createElement('link');
style.href = `${path.dirname(location)}/css/main.css`;
style.rel = 'stylesheet';
document.body.append(style);

const folders = [
  {
    name: 'components',
    path: '',
    folders: [
      {
        name: 'components',
        path: '',
        folders: [],
        files: [{ name: 'file.spec.ts', path: '' }],
      },
    ],
    files: [{ name: 'file.spec.ts', path: '' }],
  },
];

ReactDOM.render(<Browser folders={folders} />, document.getElementById('root'));
