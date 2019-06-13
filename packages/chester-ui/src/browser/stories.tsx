import React from 'react';
import { storiesOf } from '@storybook/react';
import { TopBar } from './top-bar';
import { Browser } from './browser';

storiesOf('browser', module)
  .add('top-bar', () => <TopBar />)
  .add('window', () => <Browser />);
