import React from 'react';
import { logInType, singInType } from '../types/RequestTypes';
import axios, { AxiosResponse } from 'axios';
import { navigate } from './screenNavigate';
import { basicReponseType, noteResponseType } from '../types/ResponseType';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const appContext = React.createContext({
  reponseMessage: '',
  buttonDisable: false,
  responseErrorStatus: false,
  allUserNote: [] as Array<noteResponseType>,
  signInSubmitHandler: (values: singInType) => {},
  logInSubmitHandler: (values: logInType) => {},
  getAllNotes: () => Promise.resolve({} as noteResponseType),
});
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  const [reponseMessage, setResponseMessage] = React.useState<string>('');
  const [responseErrorStatus, setResponseErrorStatus] =
    React.useState<boolean>(false);
  const [allUserNote, setAllUserNote] = React.useState<Array<noteResponseType>>(
    [],
  );
  //
  //----- default url
  //
  const defaultUrl = 'http://localhost:8080/api';
  const token = AsyncStorage.getItem('Authorization');
  //--
  //--
  //--
  function responseSetter(
    responseErrorStatus: boolean = true,
    responseMessage: string = '',
  ) {
    setResponseErrorStatus(responseErrorStatus);
    setResponseMessage(responseMessage);
    setTimeout(() => {
      setResponseErrorStatus(true);
      setResponseMessage('');
    }, 3000);
  }
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
  async function logInSubmitHandler(values: logInType) {
    setButtonDisable(true);
    const data = {
      userEmail: values.email,
      userPassword: values.password,
    };
    try {
      const response: AxiosResponse<basicReponseType> = await axios.post(
        `${defaultUrl}/login`,
        data,
      );

      console.log(response.data);

      if (response?.data?.token) {
        AsyncStorage.setItem('Authorization', response.data.token);
        console.log('token has been saved');
      }

      responseSetter(response.data.errorStatus, response.data.message);

      if (response.data.errorStatus !== true) {
        navigate('home');
        getAllNotes();
      }
    } catch (err) {
      console.log(err);
      responseSetter(true, 'we are facing some error while logging in..');
    }
    setButtonDisable(false);
  }
  async function getAllNotes(): Promise<noteResponseType> {
    const token = await AsyncStorage.getItem('Authorization');
    console.log(token);
    const response = await axios
      .get(`${defaultUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch(err => {
        console.log(err.status);
        responseSetter(
          true,
          'We are facing some error while fetching your notes \n LOGIN AGAIN',
        );
        if (err.status) {
          navigate('login');
        }
      });
    console.log(response?.data);
    return response?.data || ({} as noteResponseType);
  }
  return (
    <appContext.Provider
      value={{
        signInSubmitHandler,
        buttonDisable,
        logInSubmitHandler,
        reponseMessage,
        responseErrorStatus,
        getAllNotes,
        allUserNote,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
