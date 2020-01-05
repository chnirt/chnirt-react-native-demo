import React, {useEffect} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Icon} from 'native-base';
import {ActivityIndicator, StatusBar, Button} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignInScreen from '../containers/signin';
import SignUpScreen from '../containers/signup';

import HomeScreen from '../containers/home';
import ProfileScreen from '../containers/profile';
import SettingsScreen from '../containers/settings';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerLeft: (
          <Icon
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
      };
    },
  },
);

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator,
    },
  },
  {
    contentComponent: props => (
      <View style={{flex: 1}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <Button
            title="Logout"
            onPress={async () => {
              await AsyncStorage.clear();
              props.navigation.navigate('SignIn');
            }}
          />
        </SafeAreaView>
      </View>
    ),
    contentOptions: {
      activeTintColor: '#F50057',
      inactiveTintColor: '#1999CE',
      activeBackgroundColor: '#E8EAF6',
    },
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);

const AppStackNavigator = createDrawerNavigator(
  {Dashboard: AppDrawerNavigator},
  {
    intialRouteName: 'Dashboard',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: 'white',
      },
    },
  },
);

const AuthStackNavigator = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    headerMode: 'none',
    contentComponent: props => (
      <View style={{flex: 1}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          {props.chilren}
        </SafeAreaView>
      </View>
    ),
  },
);

function AuthLoadingScreen(props) {
  useEffect(() => {
    _bootstrapAsync();
  });

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStackNavigator,
      Auth: AuthStackNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default AppContainer;
