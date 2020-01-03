/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useContext} from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';
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
import AsyncStorage from '@react-native-community/async-storage';

import Context, {CTX} from './tools/context';

function HomeScreen(props) {
  // const authContext = useContext(CTX);
  // const {logout} = authContext;

  async function onLogout() {
    // logout();
    await AsyncStorage.clear();
    props.navigation.navigate('SignIn');
  }

  function navigateOther() {
    props.navigation.navigate('Other');
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home</Text>
      <Button block onPress={navigateOther}>
        <Text>Other</Text>
      </Button>
      <Button block onPress={onLogout}>
        <Text>Logout</Text>
      </Button>
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

function SignInScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const authContext = useContext(CTX);
  // const {authenticate} = authContext;

  async function onLogin() {
    const accessToken = username + password;
    // authenticate(accessToken);
    await AsyncStorage.setItem('@access_token', accessToken);
    props.navigation.navigate('App');
  }

  function navigateSignUp() {
    console.log(props.navigation);
    props.navigation.navigate('SignUp');
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input
              autoFocus={true}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
            />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Button block info onPress={navigateSignUp}>
            <Text>Sign up</Text>
          </Button>
          <Button block onPress={onLogin}>
            <Text>Login</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

function SignUpScreen() {
  return (
    <View>
      <Text>Sign Up</Text>
    </View>
  );
}

function AuthLoadingScreen(props) {
  useEffect(() => {
    _bootstrapAsync();
  });

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('@access_token');
    // console.log(userToken);
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

const AppStack = createStackNavigator({Home: HomeScreen, Other: OtherScreen});
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

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
  return (
    <Context>
      <AppContainer />
    </Context>
  );
}

export default App;
