import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Welcome from '../screens/Welcome';
import Login from '../screens/Auth/Login';
import Signin from '../screens/Auth/Signin';
import DrawerNavigation from './DrawerNavigation';
export type stackParamList = {
  welcome: undefined;
  login: undefined;
  signin: undefined;
  home: undefined;
};
const stack = createStackNavigator<stackParamList>();
const StackNavigation = (): React.ReactElement => {
  return (
    <stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="welcome" component={Welcome} />
      <stack.Screen name="login" component={Login} />
      <stack.Screen name="signin" component={Signin} />
      <stack.Screen name="home" component={DrawerNavigation} />
    </stack.Navigator>
  );
};
export default StackNavigation;
