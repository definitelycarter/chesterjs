import * as expect from 'expect';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { fireEvent, getByTestId } from '@testing-library/dom';
import { Login } from '../login';

describe('Login Component', () => {
  let server: any;
  beforeEach(() => {
    // @ts-ignore
    server = chester.fetchMock();
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  });
  it('should login sucessfully', async () => {
    const loginRoute = server.route('POST', /auth\/login/, { token: '123' });

    const root = document.getElementById('root');
    ReactDOM.render(<Login />, root);

    const username = root.querySelector('input[type="text"');
    const password = root.querySelector('input[type="password"');
    const login = root.querySelector('button[type="submit"]');

    fireEvent.change(username, { target: { value: 'adam@gooee.com' } });
    fireEvent.change(password, { target: { value: '8wS]W9v3&DeV' } });
    fireEvent.click(login);

    await loginRoute;
    await sleep(0);

    expect(getByTestId(root, 'token').innerText).toBeTruthy();
  });
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
