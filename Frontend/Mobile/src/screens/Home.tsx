import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = (): React.ReactElement => {
  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View>
          <Text style={{ color: 'white' }}>this is the home page</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default Home;
