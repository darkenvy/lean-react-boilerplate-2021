import React from 'react';
import { hot } from 'react-hot-loader/root';
// todo: add styled-components, redux, saga

const App = () => {
  const a = 'okay';
  console.log('here2', a);
  return (
    <div className="full-screen">
      <div>
        <h1>React Page</h1>
        <br />
        <a
          className="button-line"
          href="https://github.com/deityhub"
          target="_blank"
        >
          Hello World
        </a>
      </div>
    </div>
  );
};

export default hot(App);
