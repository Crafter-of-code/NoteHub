import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Welcome from '../Pages/Welcome';
import Login from '../Pages/Auth/Login';
import Signin from '../Pages/Auth/Signin';
export type stackParamList = {
  welcome: undefined;
  login: undefined;
  signin: undefined;
};
const stack = createStackNavigator<stackParamList>();
const StackNavigation = (): React.ReactElement => {
  return (
    <stack.Navigator initialRouteName="welcome">
      <stack.Screen name="welcome" component={Welcome} />
      <stack.Screen name="login" component={Login} />
      <stack.Screen name="signin" component={Signin} />
    </stack.Navigator>
  );
};
export default StackNavigation;
