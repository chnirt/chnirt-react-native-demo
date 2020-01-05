/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';

import Context from './tools/context';
import AppContainer from './navigator';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Context>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <AppContainer />
      {/* </SafeAreaView> */}
    </Context>
  );
}

export default App;
