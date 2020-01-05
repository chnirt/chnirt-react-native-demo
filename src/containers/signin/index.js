import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Content, Form, Item, Input, Button, Text} from 'native-base';

function index(props) {
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

export default index;
