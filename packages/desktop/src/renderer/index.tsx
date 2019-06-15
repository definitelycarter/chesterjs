import React from 'react';
import ReactDOM from 'react-dom';
import { Browser } from './browser';
import Config from '../config';

ReactDOM.render(<Browser config={Config} />, document.getElementById('root'));
