import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MyNotes from '../screens/AllNotes';
import { Image, StyleSheet } from 'react-native';
const bottomTab = createBottomTabNavigator();
const BottonTabNavigation = (): React.ReactElement => {
  return (
    <bottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {
          paddingVertical: 5,
        },
        tabBarActiveTintColor: '#192F1B',
        tabBarInactiveTintColor: '#4A8751',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 700,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 70,
          marginHorizontal: 10,
          marginTop: 4,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <bottomTab.Screen
        name="mynotes"
        component={MyNotes}
        options={{
          tabBarLabel: 'My notes',
          tabBarIcon: ({ size, color, focused }) => {
            return (
              <Image
                height={size}
                width={size}
                source={require('../asset/wirte.png')}
                style={[
                  style.iconsize,
                  focused
                    ? [style.acitveTabIconColor]
                    : [style.inactiveTabIconColor],
                ]}
              />
            );
          },
        }}
      />
    </bottomTab.Navigator>
  );
};
const style = StyleSheet.create({
  iconsize: {
    height: 30,
    width: 30,
  },
  acitveTabIconColor: {
    tintColor: '#284D2C',
  },
  inactiveTabIconColor: {
    tintColor: '#76B77D',
  },
});
export default BottonTabNavigation;
