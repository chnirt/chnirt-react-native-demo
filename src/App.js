/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Context from './tools/context';
import AppContainer from './navigator';
import {hello} from 'hello';

function App() {
  hello('asdasd');

  return (
    <Context>
      <AppContainer />
    </Context>
  );
}

export default App;
