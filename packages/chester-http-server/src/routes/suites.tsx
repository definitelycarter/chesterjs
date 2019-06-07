import { RunnerPage } from '@chester/ui';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const router = express.Router();

router.get('/', (req, res) => {
  const stream = ReactDOMServer.renderToNodeStream(<div>This is empty</div>);
  res.contentType('html');
  stream.pipe(res);
});

router.get('/*', (req, res) => {
  const suite = req.params['0'];
  const stream = ReactDOMServer.renderToNodeStream(
    <RunnerPage title={suite}>
      <iframe id="env" style={{ width: '100%' }} src={`/env/${suite}`} />
    </RunnerPage>
  );
  res.contentType('html');
  stream.pipe(res);
});

export default router;
