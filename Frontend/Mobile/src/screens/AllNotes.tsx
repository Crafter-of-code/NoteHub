import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NoteContainer from '../components/NoteContainer';
import { appContext } from '../store/AppContextProvider';

const MyNotes = (): React.ReactElement => {
  const { allUserNote, getAllNotes, deleteNote } = React.useContext(appContext);
  useEffect(() => {
    const fetch = async () => {
      await getAllNotes();
    };
    fetch();
  }, []);

  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        {allUserNote.length == 0 ? (
          <ScrollView
            onScrollBeginDrag={async () => {
              await getAllNotes();
            }}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>
              You have no notes right now
            </Text>
            <Text style={{ color: 'white', fontSize: 15, opacity: 0.4 }}>
              you can add note from the add not option below
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingTop: 50,
              paddingBottom: 70,
            }}
            data={allUserNote}
            keyExtractor={items => items.noteId.toString()}
            renderItem={({ item }) => {
              return (
                <>
                  <NoteContainer>
                    <View style={{ flexDirection: 'column' }}>
                      <View>
                        <Text
                          style={[
                            style.noteTitle,
                            { color: 'white', textTransform: 'capitalize' },
                          ]}
                        >
                          {item.noteTitle}
                        </Text>
                        <Text
                          style={[style.noteDescription, { color: 'white' }]}
                        >
                          {item.noteContent}
                        </Text>
                      </View>
                      {/* Starting of the button */}
                      <View style={style.opButtonContainer}>
                        <View style={[style.mainButtonContainer]}>
                          <TouchableOpacity
                            style={[style.noteOperationButtonStyling]}
                          >
                            <Image
                              source={require('../asset/pencil.png')}
                              style={[style.editButtonImage]}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={[style.mainButtonContainer]}>
                          <TouchableOpacity
                            style={[
                              style.noteOperationButtonStyling,
                              style.backgroundRedButton,
                            ]}
                            onPress={async () => {
                              await deleteNote(item.noteId);
                              await getAllNotes();
                            }}
                          >
                            <Image
                              source={require('../asset/bin.png')}
                              style={[
                                style.editButtonImage,
                                style.deleteButton,
                              ]}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </NoteContainer>
                </>
              );
            }}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
const style = StyleSheet.create({
  opButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
  noteDescription: {
    fontSize: 15,
    fontWeight: 500,
  },
  mainButtonContainer: {
    marginHorizontal: 5,
  },
  noteOperationButtonStyling: {
    borderRadius: 50,
    height: 30,
    width: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundRedButton: {
    backgroundColor: '#FF5C5C',
  },
  editButtonImage: {
    height: 13,
    width: 13,
  },
  deleteButton: {
    height: 18,
    width: 18,
    tintColor: 'white',
  },
});
export default MyNotes;
