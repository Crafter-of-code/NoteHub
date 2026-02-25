import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import BottonTabNavigation from './BottomTabNavigation';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { appContext } from '../store/AppContextProvider';

const drawerNav = createDrawerNavigator();

// // Custom Drawer
// const CustomDrawerContent = (props: any) => {
//   return (
//     <LinearGradient
//       colors={['#09090b', '#18181b']}
//       style={{ flex: 1, justifyContent: 'center' }}
//     >
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{ paddingTop: 40 }}
//       >
//         {/* Drawer Header */}
//         <View style={styles.drawerHeader}>
//           <Image
//             source={require('../asset/account.png')} // placeholder avatar
//             style={styles.avatar}
//           />
//           <Text style={styles.username}>John Doe</Text>
//           <Text style={styles.userEmail}>johndoe@gmail.com</Text>
//         </View>

//         {/* Drawer Items */}
//         <View style={{ marginTop: 20 }}>
//           <DrawerItem
//             label="Home"
//             onPress={() => props.navigation.navigate('drawerScreen1')}
//             icon={({ color, size, focused }) => (
//               <Image
//                 source={require('../asset/home.png')}
//                 style={[
//                   styles.icon,
//                   focused ? styles.activeIcon : styles.inactiveIcon,
//                 ]}
//               />
//             )}
//             labelStyle={styles.drawerLabel}
//             style={styles.drawerItem}
//           />
//           <DrawerItem
//             label="Setting"
//             onPress={() => props.navigation.navigate('setting')}
//             icon={({ color, size, focused }) => (
//               <Image
//                 source={require('../asset/setting.png')}
//                 style={[
//                   styles.icon,
//                   focused ? styles.activeIcon : styles.inactiveIcon,
//                 ]}
//               />
//             )}
//             labelStyle={styles.drawerLabel}
//             style={styles.drawerItem}
//           />
//         </View>
//       </DrawerContentScrollView>
//     </LinearGradient>
//   );
// };

// const DrawerNavigation = (): React.ReactElement => {
//   return (
//     <drawerNav.Navigator
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       screenOptions={({ navigation }) => ({
//         headerShown: false,
//         drawerStyle: { width: 250, backgroundColor: 'transparent' }, // we use gradient
//         overlayColor: 'rgba(0,0,0,0.5)',
//         headerLeft: () => (
//           <TouchableOpacity
//             onPress={() => navigation.openDrawer()}
//             style={{ marginLeft: 15 }}
//           >
//             <Image
//               source={require('../asset/hamburger.png')}
//               style={{ height: 24, width: 24 }}
//             />
//           </TouchableOpacity>
//         ),
//       })}
//     >
//       <drawerNav.Screen name="drawerScreen1" component={BottonTabNavigation} />
//       <drawerNav.Screen name="setting" component={Setting} />
//     </drawerNav.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerHeader: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   username: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   userEmail: {
//     color: 'white',
//     opacity: 0.6,
//     fontSize: 14,
//   },
//   drawerItem: {
//     marginVertical: 5,
//     borderRadius: 10,
//     marginHorizontal: 10,
//   },
//   drawerLabel: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: -10,
//   },
//   icon: {
//     height: 22,
//     width: 22,
//   },
//   activeIcon: {
//     tintColor: '#4CA1AF',
//   },
//   inactiveIcon: {
//     tintColor: 'white',
//     opacity: 0.6,
//   },
// });

// export default DrawerNavigation;

// this drawernavitation look to simple and boring (import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Home from '../screens/Home';
// import { Image, StyleSheet, TouchableOpacity } from 'react-native';
// import Setting from '../screens/Setting';
// import BottonTabNavigation from './BottomTabNavigation';
// const drawerNav = createDrawerNavigator();
const DrawerNavigation = (): React.ReactElement => {
  const { logoutFunction } = React.useContext(appContext);
  return (
    <>
      <TouchableOpacity
        style={style.logOutButton}
        onPress={() => {
          logoutFunction();
        }}
      >
        <Image
          source={require('../asset/logout.png')}
          style={style.logOutImage}
        />
      </TouchableOpacity>
      <drawerNav.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          drawerActiveTintColor: '#192F1B',
          drawerInactiveTintColor: '#4A8751',
          drawerActiveBackgroundColor: '#D1E6D3',
          drawerStyle: {
            backgroundColor: 'black',
          },
          headerStyle: {
            // backgroundColor: 'black',
          },
        })}
      >
        <drawerNav.Screen
          name="drawerScreen1"
          component={BottonTabNavigation}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ size, color, focused }) => {
              return (
                <Image
                  source={require('../asset/home.png')}
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
    </>
  );
};
const style = StyleSheet.create({
  logOutButton: {
    position: 'absolute',
    top: 60,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5C5C',
    height: 49,
    width: 50,
    zIndex: 99,
    borderRadius: 50,
  },
  logOutImage: {
    height: 20,
    width: 20,
    // paddingRight: 5,
    marginRight: 5,
  },
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
