export type addNoteDataType = {
  noteTitle: string;
  noteContent: string;
};
export type notesDataType = {
  noteId: number;
  noteTitle: string;
  noteContent: string;
  createdAt: Date;
}[];
export type singleNoteDataType = {
  noteId: number;
  noteTitle: string;
  noteContent: string;
};
export type responseDataType = {
  errorStatus?: boolean;
  message?: string;
  token?: string;
  userId?: number;
};
export type userDataFromServer = {
  userName: string;
  userEmail: string;
};
