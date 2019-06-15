import React from 'react';
import ReactDOM from 'react-dom';
import { Browser } from './browser';
import Config from '../config';
// const folders = [
//   {
//     name: 'components',
//     path: '',
//     folders: [
//       {
//         name: 'components',
//         path: '',
//         folders: [],
//         files: [{ name: 'file.spec.ts', path: '' }],
//       },
//     ],
//     files: [{ name: 'file.spec.ts', path: '' }],
//   },
// ];

ReactDOM.render(<Browser config={Config} />, document.getElementById('root'));
