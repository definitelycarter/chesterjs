import React from 'react';
import ReactDOM from 'react-dom';
import { RunnerPage } from '../runner';
const title = document.title;

ReactDOM.hydrate(
  // @ts-ignore
  <RunnerPage title={title}>
    <iframe id="env" style={{ width: '100%' }} src={`/env/${title}`} />
  </RunnerPage>,
  document
);
