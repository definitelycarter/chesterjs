import React from 'react';
import { storiesOf } from '@storybook/react';
import { TestRow } from './row';

storiesOf('test/row', module)
  .add('passed', () => (
    <TestRow
      status="passed"
      name="Hello, World"
      duration={{ interval: 5, unit: 'ms' }}
    />
  ))
  .add('failed', () => (
    <TestRow
      status="failed"
      name="Hello, World"
      duration={{ interval: 5, unit: 'ms' }}
    />
  ));
