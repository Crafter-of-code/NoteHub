import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Welcome from '../screens/Welcome';
import Login from '../screens/Auth/Login';
import Signin from '../screens/Auth/Signin';
import DrawerNavigation from './DrawerNavigation';
import AllNotes from '../screens/AllNotes';
import EditNote from '../screens/EditNote';
import { stackNavigationForBottomTabParamList } from '../types/ScreenNavigationTypes';
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
const stackNavigatorForBottomTab =
  createStackNavigator<stackNavigationForBottomTabParamList>();
export const StackNavigatorForBottomTab = (): React.ReactElement => {
  return (
    <stackNavigatorForBottomTab.Navigator
      initialRouteName="allNote"
      screenOptions={{
        headerShown: false,
      }}
    >
      <stackNavigatorForBottomTab.Screen name="allNote" component={AllNotes} />
      <stackNavigatorForBottomTab.Screen name="editNote" component={EditNote} />
    </stackNavigatorForBottomTab.Navigator>
  );
};
export default StackNavigation;
