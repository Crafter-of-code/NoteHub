import { string } from 'yup';

export type singInType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type logInType = {
  email: string;
  password: string;
};
export type noteDataType = {
  noteTitle: string;
  noteContent: string;
};
