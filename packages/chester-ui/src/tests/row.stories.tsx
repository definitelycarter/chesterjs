import React from 'react';
import { storiesOf } from '@storybook/react';
import { SuiteRow } from './row';

storiesOf('test/row', module)
  .add('passed', () => <SuiteRow status="passed" />)
  .add('failed', () => <SuiteRow status="failed" />);
