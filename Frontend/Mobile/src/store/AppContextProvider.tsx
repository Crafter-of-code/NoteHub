import React from 'react';
import { singInType } from '../types/RequestTypes';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { navigate } from './screenNavigate';
export const appContext = React.createContext({
  signInSubmitHandler: (values: singInType) => {},
  buttonDisable: false,
});
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  const defaultUrl = 'http://localhost:8080/api';
  async function signInSubmitHandler(values: singInType) {
    setButtonDisable(true);
    setButtonDisable(true);
    console.log(values);
    const data = {
      userName: values.name,
      userEmail: values.email,
      userPassword: values.password,
    };
    await axios
      .post(`${defaultUrl}/signin`, data)
      .then(data => {
        console.log('data has been sended and reviced');
        console.log(data);
        navigate('login');
      })
      .catch(err => {
        console.log('We are facing some error');
        console.log(err);
      })
      .finally(() => {
        console.log('this is the finally method');
        setButtonDisable(false);
      });
  }
  return (
    <appContext.Provider value={{ signInSubmitHandler, buttonDisable }}>
      {children}
    </appContext.Provider>
  );
}
