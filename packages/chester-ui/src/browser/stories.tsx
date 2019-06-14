import React from 'react';
import { Folder } from '@chester/chester';
import { storiesOf } from '@storybook/react';
import { TopBar } from './top-bar';
import { Browser } from './browser';

storiesOf('browser', module)
  .add('top-bar', () => <TopBar />)
  .add('window', () => <Browser folders={folders} />);

const folders: Folder[] = [
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
