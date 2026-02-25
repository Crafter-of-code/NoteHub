import React from 'react';
import { logInType, noteDataType, singInType } from '../types/RequestTypes';
import axios, { Axios, AxiosResponse } from 'axios';
import { navigate, push } from './screenNavigate';
import {
  basicReponseType,
  noteResponseType,
  userResponseType,
} from '../types/ResponseType';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const appContext = React.createContext<{
  reponseMessage: string;
  buttonDisable: boolean;
  responseErrorStatus: boolean;
  allUserNote: noteResponseType[];
  signInSubmitHandler: (values: singInType) => void;
  logInSubmitHandler: (values: logInType) => void;
  getAllNotes: () => void;
  addNote: (data: noteDataType) => void;
  deleteNote: (id: number) => void;
  getUserDetail: () => void;
  userDetail: userResponseType;
  editUserDetail: (data: { userName: string } | { userEmail: string }) => void;
  logoutFunction: () => void;
}>({
  reponseMessage: '',
  buttonDisable: false,
  responseErrorStatus: false,
  allUserNote: [],
  signInSubmitHandler: (values: singInType) => {},
  logInSubmitHandler: (values: logInType) => {},
  getAllNotes: () => {},
  addNote: (data: noteDataType) => {},
  deleteNote: (id: number) => {},
  getUserDetail: () => {},
  userDetail: { userEmail: '', userName: '' },
  editUserDetail: (data: { userName: string } | { userEmail: string }) => {},
  logoutFunction: () => {},
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
  const [userDetail, setUserDetail] = React.useState<userResponseType>({
    userEmail: '',
    userName: '',
  });
  //
  //----- default url
  //
  const defaultUrl = 'http://localhost:8080/api';
  //--
  //--
  //--
  async function getToken() {
    return await AsyncStorage.getItem('Authorization');
  }
  function responseSetter(
    responseErrorStatus: boolean = true,
    responseMessage: string = '',
  ) {
    setResponseErrorStatus(responseErrorStatus);
    setResponseMessage(responseMessage);
    setTimeout(() => {
      setResponseErrorStatus(true);
      setResponseMessage('');
    }, 2000);
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
        // push('home');
        getAllNotes();
      }
    } catch (err) {
      console.log(err);
      responseSetter(true, 'we are facing some error while logging in..');
    }
    setButtonDisable(false);
  }
  async function getAllNotes() {
    try {
      const token = await AsyncStorage.getItem('Authorization');

      const response = await axios.get(`${defaultUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllUserNote(response.data);
    } catch (err: any) {
      console.log(err.response?.status);

      if (err.response?.status === 401) {
        navigate('login');
      }

      responseSetter(
        true,
        'We are facing some error while fetching your notes \n LOGIN AGAIN',
      );

      return {} as noteResponseType;
    }
  }
  async function addNote(data: noteDataType) {
    const token = await AsyncStorage.getItem('Authorization');
    console.log(data);
    try {
      await axios
        .post(`${defaultUrl}/addnote`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.data)
        .catch(err => console.log(err));
    } catch (err) {
      responseSetter(true, 'We got some problem while adding you note');
    }
    getAllNotes();
  }
  async function deleteNote(id: number) {
    const token = await AsyncStorage.getItem('Authorization');
    console.log(id);
    await axios
      .delete(`${defaultUrl}/deletenote/${id.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response);
        responseSetter(false, 'The message has been deleted successfully');
      })
      .catch(err => {
        console.log(err);
        responseSetter(
          true,
          'we are facing some problem while delete your notez',
        );
      });
  }
  async function getUserDetail() {
    const token = await AsyncStorage.getItem('Authorization');
    console.log(token);
    await axios
      .get(`${defaultUrl}/userdetails`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(response.data);
        setUserDetail(response.data);
      })
      .catch(err => {
        console.log(err);
        responseSetter(
          true,
          'We are facing some problem while getting your details',
        );
      });
  }
  async function editUserDetail(
    updatedUserDetail: { userName: string } | { userEmail: string },
  ) {
    try {
      const token = await AsyncStorage.getItem('Authorization');

      const response = await axios.put(
        `${defaultUrl}/update-user-name`,
        updatedUserDetail,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data: basicReponseType = response.data;
      console.log(data);
      await responseSetter(data.errorStatus, data.message);
      if ('userEmail' in updatedUserDetail) {
        navigate('login');
      }
    } catch (err) {
      console.log(err);
      responseSetter(
        true,
        'We are facing some problem while editing your detail',
      );
    }
  }
  async function logoutFunction() {
    console.log(await AsyncStorage.clear());
    push('welcome');
    console.log(await AsyncStorage.getItem('Authorization'));
    // console.log('logoutFunction has been build');
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
        addNote,
        deleteNote,
        getUserDetail,
        userDetail,
        editUserDetail,
        logoutFunction,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
