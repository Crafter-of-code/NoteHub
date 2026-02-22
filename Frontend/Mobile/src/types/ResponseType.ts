import { boolean, string } from 'yup';

export type basicReponseType = {
  errorStatus?: boolean;
  message?: string;
  token?: string;
  userId?: number;
};
export type noteResponseType = {
  noteId: number;
  noteTitle: string;
  noteContent: string;
  createAt: Date;
}[];
