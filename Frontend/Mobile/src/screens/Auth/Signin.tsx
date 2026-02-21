import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import SolidButton from '../../components/SolidButton';
import { Formik } from 'formik';
import OutlineButton from '../../components/OutlineButton';
import InputField from '../../components/InputField';
import { SigninValidator, initialValueOfSignin } from './AuthValidator';
import { appContext } from '../../store/AppContextProvider';
//
const Signin = (): React.ReactElement => {
  const { signInSubmitHandler, buttonDisable } = React.useContext(appContext);
  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View style={[style.inner_container]}>
          <View style={{ width: '50%', alignItems: 'flex-end' }}></View>
          <Formik
            initialValues={initialValueOfSignin}
            validationSchema={SigninValidator}
            onSubmit={values => {
              signInSubmitHandler(values);
            }}
          >
            {({ values, errors, handleSubmit, handleReset, handleChange }) => (
              <View style={style.main_form_container}>
                <Text style={[style.form_heading]}>SignIn</Text>
                <View style={{ marginVertical: 10 }}>
                  <InputField
                    value={values.name}
                    placeHolder="Name"
                    setValue={handleChange('name')}
                  />
                  {errors.name && (
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: '#ef4444',
                        marginVertical: 5,
                      }}
                    >
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <InputField
                    value={values.email}
                    placeHolder="Email"
                    setValue={handleChange('email')}
                  />
                  {errors.email && (
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: '#ef4444',
                        marginVertical: 5,
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <InputField
                    value={values.password}
                    placeHolder="Password"
                    setValue={handleChange('password')}
                  />
                  {errors.password && (
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: '#ef4444',
                        marginVertical: 5,
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <InputField
                    value={values.confirmPassword}
                    placeHolder="confirm Your password"
                    setValue={handleChange('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: '#ef4444',
                        marginVertical: 5,
                      }}
                    >
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
                <View style={style.form_button_main_container}>
                  <View style={style.button_containe}>
                    <SolidButton
                      title="signin"
                      opFunc={handleSubmit}
                      buttonDisable={buttonDisable}
                    />
                  </View>
                  {buttonDisable ? (
                    <View></View>
                  ) : (
                    <View style={style.button_containe}>
                      <OutlineButton title="Reset" opFunc={handleReset} />
                    </View>
                  )}
                </View>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const style = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  form_heading: {
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 40,
    color: 'white',
    fontWeight: 500,
  },
  inner_container: {
    height: '100%',
  },
  main_form_container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  form_button_main_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button_containe: {
    width: '40%',
    marginLeft: 4,
    marginRight: 5,
    marginVertical: 10,
  },
});
export default Signin;
