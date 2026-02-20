import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { stackParamList } from '../Navigation/StackNavigation';
import Login from './Auth/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NoteContainer from '../components/NoteContainer';
import SolidButton from '../components/SolidButton';
import OutlineButton from '../components/OutlineButton';
type WelcomeScreenNavigationProp = StackNavigationProp<
  stackParamList,
  'welcome'
>;
const Welcome = (): React.ReactElement => {
  const nav: any = useNavigation();
  function signinHandler() {
    nav.navigate('signin');
  }
  function loginHandler() {
    nav.navigate('login');
  }

  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.main_container}>
        <Text style={styles.heading_text}>NoteHub</Text>
        <Text style={[styles.descirption_text]}>
          A secure note-taking system to create, edit, and manage your notes.
          Stay organized with fast access across all your devices.
        </Text>
        <NoteContainer
          title="📝 Create & Edit"
          message="Add, update, and delete notes easily with a distraction-free editor."
        />
        <NoteContainer
          title=" 🔐 Secure Access"
          message="Sign up and log in securely to keep your notes private and protected."
        />
        <NoteContainer
          title="⚡ Fast & Reliable"
          message="Optimized for speed so your notes are always just one click away."
        />
        <View style={styles.button_main_container}>
          <View style={styles.button_container}>
            <SolidButton title="Login" opFunc={loginHandler} />
          </View>
          <View style={styles.button_container}>
            <SolidButton title="New here!" opFunc={signinHandler} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  heading_text: {
    fontSize: 50,
    fontWeight: 600,
    textAlign: 'center',
    color: '#66aa6e',
  },
  descirption_text: {
    color: '#AAA8B0',
    textAlign: 'center',
    fontWeight: 500,
    marginVertical: 10,
  },
  main_container: { flex: 1, justifyContent: 'center', marginHorizontal: 10 },
  //
  button_main_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button_container: {
    marginHorizontal: 5,
    width: '49%',
  },
});
export default Welcome;
