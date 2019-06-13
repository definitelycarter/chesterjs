import React from 'react';
import { storiesOf } from '@storybook/react';
import { TestRow } from './row';

storiesOf('test/row', module)
  .add('passed', () => <TestRow status="passed" />)
  .add('failed', () => <TestRow status="failed" />);
