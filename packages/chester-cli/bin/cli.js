#!/usr/bin/env node
require('yargs')
  .commandDir('../lib/cmd')
  .help().argv;
