import React from 'react';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const Layout = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
export default Layout;
