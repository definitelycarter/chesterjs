import * as React from 'react';

export default function App() {
  React.useEffect(() => {
    function loadData() {
      fetch('https://stage-api.gooee.io/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'foo',
          password: 'bar',
        }),
      })
        .then(r => r.json())
        .then(console.log);
    }
    loadData();
  }, []);
  return <input data-testid="text-input" type="text" />;
}
