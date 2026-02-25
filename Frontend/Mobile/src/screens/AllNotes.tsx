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
import { navigate } from '../store/screenNavigate';

const AllNotes = (): React.ReactElement => {
  const { allUserNote, getAllNotes, deleteNote } = React.useContext(appContext);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'top']}>
        {allUserNote.length === 0 ? (
          <ScrollView
            onScrollBeginDrag={getAllNotes}
            contentContainerStyle={styles.emptyContainer}
          >
            <Text style={styles.emptyText}>You have no notes right now</Text>
            <Text style={styles.emptySubText}>
              You can add a note from the add note option below
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={allUserNote}
            keyExtractor={item => item.noteId.toString()}
            renderItem={({ item }) => (
              <NoteContainer>
                <View style={styles.noteContentContainer}>
                  <View style={styles.noteTextContainer}>
                    <Text style={styles.noteTitle}>{item.noteTitle}</Text>
                    <Text style={styles.noteDescription}>
                      {item.noteContent}
                    </Text>
                  </View>

                  <View style={styles.opButtonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.noteOperationButtonStyling,
                        styles.editButtonBackground,
                      ]}
                      onPress={() => navigate('editNote', { id: item.noteId })}
                    >
                      <Image
                        source={require('../asset/pencil.png')}
                        style={styles.editButtonImage}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.noteOperationButtonStyling,
                        styles.backgroundRedButton,
                      ]}
                      onPress={async () => {
                        await deleteNote(item.noteId);
                        await getAllNotes();
                      }}
                    >
                      <Image
                        source={require('../asset/bin.png')}
                        style={styles.deleteButton}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </NoteContainer>
            )}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.5,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 80,
  },
  noteContentContainer: {
    flexDirection: 'column',
  },
  noteTextContainer: {},
  noteTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  noteDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  opButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  noteOperationButtonStyling: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  backgroundRedButton: {
    backgroundColor: '#FF5C5C',
  },
  editButtonImage: {
    height: 15,
    width: 15,
    tintColor: 'white',
  },
  deleteButton: {
    height: 15,
    width: 15,
    tintColor: 'white',
  },

  editButtonBackground: {
    backgroundColor: '#4CA1AF', // subtle accent color
  },
});

export default AllNotes;
