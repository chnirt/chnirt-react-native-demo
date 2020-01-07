/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  View,
  Label,
} from 'native-base';

function index(props) {
  const {navigation} = props;
  const {navigate} = navigation;
  const [email, setEmail] = useState('chin1@gmail.com');
  const [password, setPassword] = useState('0');

  // const authContext = useContext(CTX);
  // const {authenticate} = authContext;

  async function onLogin() {
    // const accessToken = email + password;

    return await fetch(
      'https://nestjs-restful-best-practice.herokuapp.com/v1/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    )
      .then(response => response.json())
      .then(async res => {
        const {accessToken, user} = res;
        const {name, verified} = user;
        if (verified) {
          await AsyncStorage.setItem('userToken', accessToken);
          navigate('App');
        }
        await AsyncStorage.setItem('userToken', accessToken);
        navigate('Otp');
      });
  }

  function navigateSignUp() {
    navigate('SignUp');
  }

  return (
    <Content>
      <Content>
        <View>
          <Form>
            <Item>
              <Label>Email</Label>
              <Input
                autoFocus={true}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>

            <Button block primary onPress={onLogin}>
              <Text> Login </Text>
            </Button>
            <Button transparent onPress={navigateSignUp}>
              <Text> Sign Up </Text>
            </Button>
          </Form>
        </View>
      </Content>
    </Content>
  );
}

export default index;
