import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
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
  const { buttonDisable } = React.useContext(appContext);
  return (
    <LinearGradient
      colors={['#09090b', '#18181b', '#000000']}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Centered Form */}
          <View style={styles.formWrapper}>
            <Formik
              initialValues={initialValueOfLogin}
              validationSchema={loginValidator}
              onSubmit={values => Alert.alert(JSON.stringify(values))}
            >
              {({ handleChange, errors, values, handleSubmit }) => (
                <View>
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 40,
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    Login
                  </Text>
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

          {/* Button at the bottom */}
          <View style={styles.bottomButton}>
            <OutlineButton
              title="Don't have an account?"
              opFunc={() => (navigation as any).navigate('signin')}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
    marginVertical: 5,
  },
});

export default Login;
