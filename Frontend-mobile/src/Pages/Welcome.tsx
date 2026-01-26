import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { stackParamList } from '../Navigation/StackNavigation';
import Login from './Auth/Login';
type WelcomeScreenNavigationProp = StackNavigationProp<
  stackParamList,
  'welcome'
>;
const Welcome = (): React.ReactElement => {
  const nav: any = useNavigation();
  function loginButtonHandler() {
    nav.navigate('login');
  }

  return (
    <View>
      <Text>This is the welcome page</Text>
      <View>
        <TouchableOpacity onPress={() => nav.navigate('login')}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate('signin')}>
          <Text>Signin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Welcome;
