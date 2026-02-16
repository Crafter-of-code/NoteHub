import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addNoteDataType } from '../../types/dataTypes';

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
  token = sessionStorage.getItem('token');

  defaultRoute: string = 'http://localhost:8080/api';
  userId: number = 0;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}
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
    return this.http.post(`${this.defaultRoute}/addnote`, data, { headers });
  }
  deleteNote(id: number) {
    console.log(id);
    const headers = new HttpHeaders({
      Authorization: `${this.token}`,
    });
    return this.http.delete<responseDataType>(
      `${this.defaultRoute}/deletenote/${id}`,
      { headers }
    );
  }
}
