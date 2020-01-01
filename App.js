/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useRef, useEffect, useContext} from 'react';
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

import Context, {CTX} from './tools/context';

function HomeScreen() {
  const authContext = useContext(CTX);
  const {logout} = authContext;

  function onLogout() {
    logout();
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home</Text>
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

  const authContext = useContext(CTX);
  const {authenticate} = authContext;

  function onLogin() {
    const accessToken = username + password;
    authenticate(accessToken);
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Label style={{color: '#000'}}>Last Name</Label>
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
          <Button block onPress={onLogin}>
            <Text>Login</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

function AuthLoadingScreen(props) {
  const authContext = useContext(CTX);
  const {isAuth} = authContext;
  return isAuth ? <HomeScreen props={props} /> : <SignInScreen props={props} />;
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
  return (
    <Context>
      <AppContainer />
    </Context>
  );
}

export default App;
