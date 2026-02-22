import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { noteResponseType } from '../types/ResponseType';
import { appContext } from '../store/AppContextProvider';

const MyNotes = (): React.ReactElement => {
  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View>
          <Text style={{ color: 'white' }}>My notes</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default MyNotes;
