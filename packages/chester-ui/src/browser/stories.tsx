import React from 'react';
import { Folder } from '@chester/chester';
import { storiesOf } from '@storybook/react';
import { TopBar } from './top-bar';
import { Browser } from './browser';

storiesOf('browser', module)
  .add('top-bar', () => <TopBar projectName="my story" />)
  .add('window', () => (
    <Browser
      folder={{ name: 'story', path: '', folders: folders, files: [] }}
    />
  ));

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
