import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Text, View} from 'native-base';
import {createAppContainer} from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!1111</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home1: HomeScreen,
  Settings1: SettingsScreen,
});

export default createAppContainer(TabNavigator);
