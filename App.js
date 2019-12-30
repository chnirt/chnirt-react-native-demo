/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home</Text>
    </View>
  );
}

function OtherScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Other</Text>
    </View>
  );
}

function AuthScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>AuthScreen</Text>
    </View>
  );
}

function SignInScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>SignIn</Text>
    </View>
  );
}

function AuthLoadingScreen() {
  const isAuth = false;
  return isAuth ? <HomeScreen /> : <SignInScreen />;
}

const AppStack = createStackNavigator({Home: HomeScreen, Other: OtherScreen});
const AuthStack = createStackNavigator({SignIn: SignInScreen});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

function App() {
  return <AppContainer />;
}

export default App;
