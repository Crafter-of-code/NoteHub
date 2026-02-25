import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet } from 'react-native';
import AddNote from '../screens/AddNote';
import { StackNavigatorForBottomTab } from './StackNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (): React.ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,

        tabBarItemStyle: {
          height: '100%', // important
          justifyContent: 'center',
          alignItems: 'center',
        },

        tabBarIconStyle: {
          marginTop: 0, // remove default offset
        },
      }}
    >
      {/* My Notes */}
      <Tab.Screen
        name="allnotes"
        component={StackNavigatorForBottomTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <Image
                source={require('../asset/note.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#ffffff' : '#6c757d' },
                ]}
              />
            </View>
          ),
        }}
      />

      {/* Add Note */}
      <Tab.Screen
        name="addnote"
        component={AddNote}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <Image
                source={require('../asset/Add note.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#ffffff' : '#6c757d' },
                ]}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    right: 25,
    height: 70,
    borderRadius: 30,
    backgroundColor: '#1c1c1e',
    borderTopWidth: 0,
    elevation: 10,
    flexDirection: 'row',
    maxHeight: 'auto',
  },

  iconContainer: {
    // flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeIconContainer: {
    backgroundColor: '#4A8751',
    width: 55,
    height: 55,
    borderRadius: 28,
  },

  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default BottomTabNavigation;
