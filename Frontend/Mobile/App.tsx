/*
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Layout from './src/Layout';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
    </>
  );
}
const style = StyleSheet.create({
  toastifyToMargin: {
    marginTop: 10,
  },
});
export default App;
