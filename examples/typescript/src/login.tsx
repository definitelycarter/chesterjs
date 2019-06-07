import * as React from 'react';

export function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [token, setToken] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoggingIn(true);
    const response = await fetch('https://stage-api.gooee.io/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const body = await response.json();
    setToken(body.token);
    setIsLoggingIn(false);
  }

  return (
    <form autoComplete="off" onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoggingIn}>
        Login
      </button>
      <span data-testid="token">{token}</span>
    </form>
  );
}
