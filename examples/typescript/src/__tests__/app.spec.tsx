import * as expect from 'expect';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fireEvent, getByTestId } from '@testing-library/dom';

import App from '../app';

it('this is a root test', () => {
  expect(true).toBe(true);
});

it('this is a failed async test', async () => {
  await sleep(1000);
  expect(true).toBe(false);
});

describe('another component describe', () => {
  it('simple test', () => {
    expect(true).toBe(true);
  });
});

describe('typescript component', () => {
  describe('this is a nested describe block', () => {
    it('this is a deeply nested test', () => {
      expect(true).toBe(true);
    });
  });
  describe('this is a nested describe block', () => {
    it('this is a deeply nested test', () => {
      expect(true).toBe(true);
    });
  });

  let server: any;
  beforeEach(() => {
    server = chester.fetchMock();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  });

  it('should render successfully', async () => {
    const login = server.route('POST', /auth\/login/, { token: '123' });
    ReactDOM.render(<App />, document.getElementById('root'));
    const element = getByTestId(
      document.body,
      'text-input'
    ) as HTMLInputElement;
    fireEvent.change(element, { target: { value: 'Hello, World!' } });
    expect((element as HTMLInputElement).value).toBe('Hello, World!');
    await login;
  });
});

it('this is an async test at the end', async () => {
  await sleep(1500);
  expect(true).toBe(true);
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
