#!/usr/bin/env node

const { BaseOptions } = require('../lib/options');

require('yargs')
  .options(BaseOptions)
  .commandDir('../lib/cmd')
  .help().argv;
