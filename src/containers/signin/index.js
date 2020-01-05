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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const authContext = useContext(CTX);
  // const {authenticate} = authContext;

  async function onLogin() {
    const accessToken = username + password;
    await AsyncStorage.setItem('userToken', accessToken);
    props.navigation.navigate('App');
  }

  function navigateSignUp() {
    console.log(props.navigation);
    props.navigation.navigate('SignUp');
  }

  return (
    <Content>
      <Content>
        <View>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input
                autoFocus={true}
                onChangeText={text => setUsername(text)}
              />
            </Item>
            <Item last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
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
