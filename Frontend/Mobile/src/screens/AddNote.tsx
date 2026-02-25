import React from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import SolidButton from '../components/SolidButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { appContext } from '../store/AppContextProvider';

const initialValue = {
  noteTitle: '',
  noteContent: '',
};

const noteValidator = yup.object({
  noteTitle: yup.string().required('This is required'),
  noteContent: yup.string().required('This is required'),
});

const AddNote = (): React.ReactElement => {
  const { addNote } = React.useContext(appContext);

  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 20, paddingTop: 40, gap: 20 }}
          >
            {/* Header */}
            <Text style={styles.headerText}>Create a New Note</Text>
            <Text style={styles.subText}>
              Add a title and some content to save your note. Your notes are
              private and stored locally.
            </Text>

            {/* Formik Inputs */}
            <Formik
              initialValues={initialValue}
              validationSchema={noteValidator}
              onSubmit={values => {
                addNote(values);
              }}
            >
              {({ handleChange, handleSubmit, errors, values, resetForm }) => (
                <View style={{ gap: 20 }}>
                  <InputField
                    placeHolder="Enter your note title"
                    value={values.noteTitle}
                    setValue={handleChange('noteTitle')}
                  />
                  {errors.noteTitle ? (
                    <Text style={{ color: 'red' }}>{errors.noteTitle}</Text>
                  ) : (
                    ''
                  )}
                  <InputField
                    placeHolder="Enter your note content"
                    value={values.noteContent}
                    setValue={handleChange('noteContent')}
                    multiLine={true}
                    numberOfLine={10}
                  />
                  {errors.noteTitle ? (
                    <Text style={{ color: 'red' }}>{errors.noteTitle}</Text>
                  ) : (
                    ''
                  )}
                  <SolidButton
                    title="Add Note"
                    opFunc={async () => {
                      await handleSubmit();
                      resetForm();
                    }}
                    buttonDisable={false}
                  />
                </View>
              )}
            </Formik>

            {/* Optional Tip / Footer */}
            <Text style={styles.footerText}>
              Tip: Keep your notes short and clear. You can edit them anytime
              from your notes list.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = {
  headerText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700' as const,
    marginBottom: 10,
    textAlign: 'center' as const,
  },
  subText: {
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  footerText: {
    color: 'white',
    opacity: 0.4,
    fontSize: 12,
    marginTop: 30,
    textAlign: 'center' as const,
  },
};

export default AddNote;
