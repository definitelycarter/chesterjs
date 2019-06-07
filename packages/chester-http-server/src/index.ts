import { readConfig } from '@chester/config';
import express from 'express';
import routes from './routes';
import path from 'path';

export function run(options: { port: number; project: string }) {
  const app = express();
  app.set('chester-config', readConfig(options));
  app.use(express.static(path.resolve('node_modules/@chester/ui/static')));
  app.use(
    express.static(path.resolve('node_modules/@chester/chester-api/lib'))
  );
  app.use(routes);

  return new Promise(resolve => {
    app.listen(options.port, resolve);
  });
}
