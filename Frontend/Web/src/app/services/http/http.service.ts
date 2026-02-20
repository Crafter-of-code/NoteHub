import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  addNoteDataType,
  singleNoteDataType,
  userDataFromServer,
} from '../../types/dataTypes';

type loginSeccessesMessage = {
  message: string;
};
export type responseDataType = {
  errorStatus: boolean;
  message: string;
  token: string;
  userId: number;
};
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  token = localStorage.getItem('token');
  defaultRoute: string = 'http://localhost:8080/api';
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}
  signIn(data: { userName: string; userEmail: string; userPassword: string }) {
    return this.http.post<any>(`${this.defaultRoute}/signin`, data);
  }
  logIn(data: { userEmail: string; userPassword: string }) {
    return this.http.post<responseDataType>(`${this.defaultRoute}/login`, data);
  }
  getHomeData() {
    const authheaders = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.get<any>(`${this.defaultRoute}/home`, {
      headers: authheaders,
    });
  }
  addNote(data: addNoteDataType) {
    const headers = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.post<responseDataType>(
      `${this.defaultRoute}/addnote`,
      data,
      { headers }
    );
  }
  deleteNote(id: number) {
    const headers = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.delete<responseDataType>(
      `${this.defaultRoute}/deletenote/${id}`,
      { headers }
    );
  }
  getSingleNote(id: number) {
    const headers = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.get<singleNoteDataType>(
      `${this.defaultRoute}/notes/${id}`,
      {
        headers,
      }
    );
  }
  updateNote(id: number, updatedNote: addNoteDataType) {
    return this.http.patch<responseDataType>(
      `${this.defaultRoute}/note/${id}`,
      updatedNote,
      { headers: { Authorization: `${this.token}` } }
    );
  }
  getUserDetail() {
    const authHeader = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.get<userDataFromServer>(
      `${this.defaultRoute}/userdetails`,
      {
        headers: authHeader,
      }
    );
  }
  updateUserDetail(data: { userName: string }) {
    const authHeader = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.put(`${this.defaultRoute}/update-user-name`, data, {
      headers: authHeader,
    });
  }
}
