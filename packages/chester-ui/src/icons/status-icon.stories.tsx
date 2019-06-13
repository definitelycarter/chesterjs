import React from 'react';
import { storiesOf } from '@storybook/react';
import { StatusIcon } from './status-icon';

storiesOf('icons/status', module)
  .addDecorator(getStory => (
    <div
      style={{ width: 20, display: 'flex', justifyContent: 'space-between' }}
    >
      {getStory()}
    </div>
  ))
  .add('suite', () => (
    <>
      <StatusIcon type="suite" status="passed" />
      <StatusIcon type="suite" status="failed" />
    </>
  ))
  .add('test', () => (
    <>
      <StatusIcon type="test" status="passed" />
      <StatusIcon type="test" status="failed" />
    </>
  ));
