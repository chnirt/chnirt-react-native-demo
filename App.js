/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
} from 'native-base';
import SplashScreen from 'react-native-splash-screen';

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
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');

  function onLogin() {
    console.log(username, password);
    Alert.alert('Simple Button pressed');
  }
  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Label style={{color: '#000'}}>Last Name</Label>
            <Input
              placeholder="Username"
              getRef={input => {
                this.usernameRef = input;
              }}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
              getRef={input => {
                this.paswordRef = input;
              }}
            />
          </Item>
          <Button block onPress={onLogin}>
            <Text>Login</Text>
          </Button>
        </Form>
      </Content>
    </Container>
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
  useEffect(() => {
    SplashScreen.hide();
  });
  return <AppContainer />;
}

export default App;
