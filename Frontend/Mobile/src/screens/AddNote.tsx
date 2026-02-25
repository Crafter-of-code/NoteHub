import React from 'react';
import { Alert, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import SolidButton from '../components/SolidButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { appContext } from '../store/AppContextProvider';
const initialValue = {
  noteTitle: 'first note',
  noteContent: 'hello',
};
const noteValidator = yup.object({
  noteTitle: yup.string().required('This is require'),
  noteContent: yup.string().required('This is require'),
});
const AddNote = (): React.ReactElement => {
  const { addNote } = React.useContext(appContext);
  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <Formik
          initialValues={initialValue}
          validationSchema={noteValidator}
          onSubmit={values => {
            addNote(values);
          }}
        >
          {({ handleChange, handleSubmit, errors, values }) => (
            <View style={{ gap: 20 }}>
              <View style={{ marginHorizontal: 10 }}>
                <InputField
                  placeHolder="Enter your note title"
                  value={values.noteTitle}
                  setValue={handleChange('noteTitle')}
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <InputField
                  placeHolder="Enter your note content"
                  value={values.noteContent}
                  setValue={handleChange('noteContent')}
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <SolidButton
                  title="Add note"
                  opFunc={handleSubmit}
                  buttonDisable={false}
                />
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AddNote;
