import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'native-base';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Button,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Context, {CTX} from '../tools/context';

import SignInScreen from '../containers/signin';
import SignUpScreen from '../containers/signup';
import OtpScreen from '../containers/otp';

import HomeScreen from '../containers/home';
import ProfileScreen from '../containers/profile';
import SettingsScreen from '../containers/settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
});

const DashboardTabNavigator = createBottomTabNavigator({
  // Home: HomeScreen,
  Home: OtpScreen,
  Profile: ProfileScreen,
  Settings: SettingsScreen,
});

DashboardTabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  return {
    headerTitle: routeName,
    headerLeft: (
      <Icon
        style={{paddingLeft: 10}}
        onPress={() => navigation.openDrawer()}
        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        size={30}
      />
    ),
    headerRight: (
      <View style={styles.iconContainer}>
        <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
        <Icon name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
        <Icon name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} />
      </View>
    ),
  };
};

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
AppDrawerNavigator;

const AppStackNavigator = createDrawerNavigator(
  {Dashboard: AppDrawerNavigator, Otp: OtpScreen},
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
