import React, { useEffect } from 'react';
import StackNavigation from './Navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import AppContextProvider from './store/AppContextProvider';
import { navigationRef } from './store/screenNavigate';
import { Toast } from 'toastify-react-native';
import ToastManager from 'toastify-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResponseStatus from './components/ResponseStatus';
const Layout = (): React.ReactElement => {
  return (
    <>
      <AppContextProvider>
        <ResponseStatus />
        <NavigationContainer ref={navigationRef}>
          <StackNavigation />
        </NavigationContainer>
      </AppContextProvider>
    </>
  );
};
export default Layout;
