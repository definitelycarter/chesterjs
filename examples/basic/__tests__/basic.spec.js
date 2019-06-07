const ReactDOM = require('react-dom');
const React = require('react');
const expect = require('expect');

describe('parent directory spec', () => {
  it('should render successfully', function() {
    const elem = document.createElement('div');
    elem.id = 'root';
    document.body.append(elem);

    ReactDOM.render(
      React.createElement('div', {
        id: 'foo',
        children: 'Hello, World',
      }),
      document.getElementById('root')
    );
    expect(document.getElementById('foo')).toBeDefined();
  });
});
