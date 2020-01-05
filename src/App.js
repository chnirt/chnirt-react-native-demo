/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import Context from './tools/context';
import AppContainer from './navigator';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Context>
      <AppContainer />
    </Context>
  );
}

export default App;
