import { RouteProp } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { stackNavigationForBottomTabParamList } from '../types/ScreenNavigationTypes';
import InputField from '../components/InputField';
import SolidButton from '../components/SolidButton';
import { appContext } from '../store/AppContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

type editNoteRouteProp = RouteProp<
  stackNavigationForBottomTabParamList,
  'editNote'
>;

type props = {
  route: editNoteRouteProp;
};

const EditNote = ({ route }: props): React.ReactElement => {
  const { allUserNote, updatedNoteData } = React.useContext(appContext);
  const { id } = route.params;

  const data = React.useMemo(
    () => allUserNote.find(item => item.noteId == id),
    [id],
  );

  if (!data) {
    return (
      <LinearGradient
        colors={['#09090b', '#18181b', '#000000']}
        style={styles.container}
      >
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Note not found</Text>
        </View>
      </LinearGradient>
    );
  }

  const [noteTitle, setNoteTitle] = React.useState(data?.noteTitle);
  const [noteContent, setNoteContent] = React.useState(data?.noteContent);

  const updatedData = { noteTitle, noteContent };

  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Optional icon/illustration */}
            <View style={styles.iconContainer}>
              {/* <Image
                source={require('../asset/edit_note_icon.png')} // replace with your icon
                style={styles.iconImage}
                resizeMode="contain"
              /> */}
            </View>

            <Text style={styles.headerText}>Edit Note</Text>
            <Text style={styles.subText}>
              Update your note below. Changes will be saved instantly.
            </Text>

            {/* InputField components remain untouched */}
            <InputField
              multiLine={false}
              value={noteTitle}
              setValue={text => setNoteTitle(text)}
              placeHolder={data.noteTitle || 'Title'}
            />

            <InputField
              multiLine={true}
              numberOfLine={10}
              value={noteContent}
              setValue={text => setNoteContent(text)}
              placeHolder={data.noteContent || 'Content'}
            />

            {/* SolidButton remains untouched */}
            <View style={styles.buttonContainer}>
              <SolidButton
                title="Save Changes"
                opFunc={() => updatedNoteData(id, updatedData)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
    gap: 15,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconImage: {
    width: 100,
    height: 100,
    opacity: 0.7,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonContainer: {
    marginTop: 20,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default EditNote;
