import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addNoteDataType, singleNoteDataType } from '../../types/dataTypes';

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
  header = {};
  defaultRoute: string = 'http://localhost:8080/api';
  userId: number = 0;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.header = new HttpHeaders({
      Authorization: `${this.token}`,
    });
  }
  login() {
    return this.http.post<loginSeccessesMessage>(
      `http://localhost:9191/login`,
      { name: 'uzair' }
    );
  }
  signIn(data: { userName: string; userEmail: string; userPassword: string }) {
    return this.http.post<any>(`${this.defaultRoute}/signin`, data);
  }
  logIn(data: { userEmail: string; userPassword: string }) {
    return this.http.post<responseDataType>(`${this.defaultRoute}/login`, data);
  }
  getHomeData() {
    const headers = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.get<any>(`${this.defaultRoute}/home`, { headers });
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
}
