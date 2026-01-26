import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Pages/Welcome';
import StackNavigation from './Navigation/StackNavigation';
const stack = createStackNavigator();
const Routing = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
export default Routing;
