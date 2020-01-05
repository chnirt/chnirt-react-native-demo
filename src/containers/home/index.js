import React from 'react';
import {
  View,
  Text,
  Button,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

function index(props) {
  async function onLogout() {
    // logout();
    await AsyncStorage.clear();
    props.navigation.navigate('SignIn');
  }

  function navigateOther() {
    props.navigation.navigate('Other');
  }

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home1</Text>
        <Button block onPress={navigateOther}>
          <Text>Other</Text>
        </Button>
        <Button block onPress={onLogout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </Container>
  );
}

export default index;
