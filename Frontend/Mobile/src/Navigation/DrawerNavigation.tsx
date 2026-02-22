import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { Image, StyleSheet } from 'react-native';
import Setting from '../screens/Setting';
import BottonTabNavigation from './BottomTabNavigation';
const drawerNav = createDrawerNavigator();
const DrawerNavigation = (): React.ReactElement => {
  return (
    <drawerNav.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#192F1B',
        drawerInactiveTintColor: '#4A8751',
        drawerActiveBackgroundColor: '#D1E6D3',
      }}
    >
      <drawerNav.Screen
        name="drawerScreen1"
        component={BottonTabNavigation}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ size, color, focused }) => {
            return (
              <Image
                source={require('../asset/add-post.png')}
                tintColor={color}
                style={[
                  style.iconsize,
                  // focused
                  //   ? [style.acitveTabIconColor]
                  //   : [style.inactiveTabIconColor],
                ]}
              />
            );
          },
        }}
      />
      <drawerNav.Screen
        name="setting"
        component={Setting}
        options={{
          drawerLabel: 'Setting',
          drawerIcon: ({ size, color, focused }) => {
            return (
              <Image
                source={require('../asset/setting.png')}
                tintColor={color}
                style={[
                  style.iconsize,
                  // focused
                  //   ? [style.acitveTabIconColor]
                  //   : [style.inactiveTabIconColor],
                ]}
              />
            );
          },
        }}
      />
    </drawerNav.Navigator>
  );
};
const style = StyleSheet.create({
  iconsize: {
    height: 20,
    width: 20,
  },
  acitveTabIconColor: {
    tintColor: '#284D2C',
  },
  inactiveTabIconColor: {
    tintColor: '#76B77D',
  },
});
export default DrawerNavigation;
