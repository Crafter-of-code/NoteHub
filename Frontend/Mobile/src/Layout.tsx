import React from 'react';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import AppContextProvider from './store/AppContextProvider';
import { navigationRef } from './store/screenNavigate';
const Layout = (): React.ReactElement => {
  return (
    <AppContextProvider>
      <NavigationContainer ref={navigationRef}>
        <StackNavigation />
      </NavigationContainer>
    </AppContextProvider>
  );
};
export default Layout;
