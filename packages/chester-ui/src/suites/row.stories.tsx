import React from 'react';
import { storiesOf } from '@storybook/react';
import { SuiteRow } from './row';

storiesOf('suite/row', module)
  .add('passed', () => (
    <SuiteRow
      status="passed"
      name="Hello, World"
      duration={{ interval: 5, unit: 'ms' }}
    />
  ))
  .add('failed', () => (
    <SuiteRow
      status="failed"
      name="Hello, World"
      duration={{ interval: 5, unit: 'ms' }}
    />
  ));
