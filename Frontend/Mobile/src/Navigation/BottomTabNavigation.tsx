import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MyNotes from '../screens/AllNotes';
import { Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import EditNote from '../screens/EditNote';
import AddNote from '../screens/AddNote';
import { appContext } from '../store/AppContextProvider';
const bottomTab = createBottomTabNavigator();
const BottonTabNavigation = (): React.ReactElement => {
  const { logoutFunction } = React.useContext(appContext);
  return (
    <>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 60,
          right: 20,
          zIndex: 99,
          backgroundColor: '#c9184a',
          borderRadius: 50,
          paddingLeft: 10,
          justifyContent: 'center',
          // alignItems: 'center',
          height: 40,
          width: 40,
        }}
        onPress={() => logoutFunction()}
      >
        <Image
          source={require('../asset/logout2.png')}
          style={{
            height: 20,
            width: 20,
          }}
        />
      </TouchableOpacity>
      <bottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIconStyle: {
            paddingVertical: 5,
          },
          tabBarActiveTintColor: '#4A8751',
          tabBarInactiveTintColor: ' #09090b',
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
            borderRadius: 50,
            height: 65,
            marginHorizontal: 10,
            marginTop: 4,
            marginBottom: 10,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
            borderRadius: 50,
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
                  source={require('../asset/note.png')}
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
        <bottomTab.Screen
          name="addnote"
          component={AddNote}
          options={{
            tabBarLabel: 'Add Note',
            tabBarIcon: ({ color, focused, size }) => {
              return (
                <Image
                  height={size}
                  width={size}
                  source={require('../asset/add-post.png')}
                  style={[
                    style.editIconSize,
                    focused
                      ? [style.acitveTabIconColor]
                      : [style.inactiveTabIconColor],
                  ]}
                />
              );
            },
          }}
        />
        <bottomTab.Screen
          name="editnote"
          component={EditNote}
          options={{
            tabBarIcon: ({ color, focused, size }) => {
              return (
                <Image
                  height={size}
                  width={size}
                  source={require('../asset/edit-text.png')}
                  style={[
                    style.editIconSize,
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
    </>
  );
};
const style = StyleSheet.create({
  iconsize: {
    height: 30,
    width: 30,
  },
  editIconSize: {
    height: 28,
    width: 28,
  },
  acitveTabIconColor: {
    tintColor: '#76B77D',
  },
  inactiveTabIconColor: {
    tintColor: '#284D2C',
  },
});
export default BottonTabNavigation;
