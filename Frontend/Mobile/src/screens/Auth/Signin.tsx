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
import { SafeAreaView } from 'react-native-safe-area-context';
import SolidButton from '../../components/SolidButton';
import OutlineButton from '../../components/OutlineButton';
import InputField from '../../components/InputField';
import { SigninValidator, initialValueOfSignin } from './AuthValidator';
import { appContext } from '../../store/AppContextProvider';
import { Formik } from 'formik';

const Signin = (): React.ReactElement => {
  const { signInSubmitHandler, buttonDisable } = React.useContext(appContext);

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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Optional Illustration / Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../asset/signin.png')} // replace with your own illustration
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Header & Subtext */}
            <Text style={styles.form_heading}>Sign In</Text>
            <Text style={styles.subText}>
              Welcome back! Please sign in to continue and access your notes
              securely.
            </Text>

            {/* Formik Form */}
            <Formik
              initialValues={initialValueOfSignin}
              validationSchema={SigninValidator}
              onSubmit={values => signInSubmitHandler(values)}
            >
              {({
                values,
                errors,
                handleSubmit,
                handleReset,
                handleChange,
              }) => (
                <View style={styles.main_form_container}>
                  <View style={styles.inputWrapper}>
                    <InputField
                      value={values.name}
                      placeHolder="Name"
                      setValue={handleChange('name')}
                    />
                    {errors.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>

                  <View style={styles.inputWrapper}>
                    <InputField
                      value={values.email}
                      placeHolder="Email"
                      setValue={handleChange('email')}
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.inputWrapper}>
                    <InputField
                      value={values.password}
                      placeHolder="Password"
                      setValue={handleChange('password')}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.inputWrapper}>
                    <InputField
                      value={values.confirmPassword}
                      placeHolder="Confirm Password"
                      setValue={handleChange('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>

                  {/* Buttons */}
                  <View style={styles.form_button_main_container}>
                    <View style={styles.buttonContainer}>
                      <SolidButton
                        title="Sign In"
                        opFunc={handleSubmit}
                        buttonDisable={buttonDisable}
                      />
                    </View>
                    {!buttonDisable && (
                      <View style={styles.buttonContainer}>
                        <OutlineButton title="Reset" opFunc={handleReset} />
                      </View>
                    )}
                  </View>

                  {/* Footer Tip / Content */}
                  <Text style={styles.footerText}>
                    Don’t have an account yet? Sign up to create a new account
                    and start taking notes today!
                  </Text>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  form_heading: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subText: {
    textAlign: 'center',
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    marginBottom: 25,
  },
  main_form_container: {
    gap: 15,
  },
  inputWrapper: {
    marginVertical: 5,
  },
  errorText: {
    color: '#ef4444',
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 12,
  },
  form_button_main_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 15,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: '40%',
    marginVertical: 10,
  },
  footerText: {
    color: 'white',
    opacity: 0.5,
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Signin;
