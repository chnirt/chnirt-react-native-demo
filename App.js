/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import Context from './src/tools/context';
import AppContainer from './src/navigator';

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
