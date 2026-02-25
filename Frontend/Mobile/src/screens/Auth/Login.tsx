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
import InputField from '../../components/InputField';
import { Formik } from 'formik';
import { loginValidator, initialValueOfLogin } from './AuthValidator';
import SolidButton from '../../components/SolidButton';
import OutlineButton from '../../components/OutlineButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { appContext } from '../../store/AppContextProvider';

const Login = (): React.ReactElement => {
  const navigation = useNavigation<any>();
  const { buttonDisable, logInSubmitHandler } = React.useContext(appContext);

  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../asset/login.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Header */}
            <Text style={styles.headerText}>Welcome Back</Text>
            <Text style={styles.subText}>
              Sign in to continue to your account and access your notes
              securely.
            </Text>

            {/* Form */}
            <View style={styles.formWrapper}>
              <Formik
                initialValues={initialValueOfLogin}
                validationSchema={loginValidator}
                onSubmit={values => logInSubmitHandler(values)}
              >
                {({ handleChange, errors, values, handleSubmit }) => (
                  <View style={{ gap: 15 }}>
                    <InputField
                      placeHolder="Enter your email"
                      setValue={handleChange('email')}
                      value={values.email}
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <InputField
                      placeHolder="Enter your password"
                      setValue={handleChange('password')}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <View style={{ marginTop: 20 }}>
                      <SolidButton
                        title="Login"
                        opFunc={handleSubmit}
                        buttonDisable={buttonDisable}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>

            {/* Footer */}
            <View style={styles.bottomContainer}>
              <OutlineButton
                title="Don't have an account? Sign Up"
                opFunc={() => (navigation as any).navigate('signin')}
              />
              <Text style={styles.footerText}>
                By signing in, you agree to our Terms of Service and Privacy
                Policy.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 20,
  },
  formWrapper: {
    gap: 15,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 5,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
