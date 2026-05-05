import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  addNoteDataType,
  responseDataType,
  singleNoteDataType,
  userDataFromServer,
} from '../../types/dataTypes';
import { Observable } from 'rxjs';

type loginSeccessesMessage = {
  message: string;
};
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // defaultRoute: string = 'http://localhost:8080/api';
  defaultRoute: string = 'https://backend-notehub-com.onrender.com/api';
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
  getServerStatus(): Observable<string> {
    return this.http.get(`${this.defaultRoute}/welcome`, {
      responseType: 'text',
    });
  }
  getHomeData() {
    // const authheaders = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.get<any>(
      `${this.defaultRoute}/notes`
      //   {
      //   headers: authheaders,
      // }
    );
  }
  addNote(data: addNoteDataType) {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.post<responseDataType>(
      `${this.defaultRoute}/note`,
      data
      // { headers }
    );
  }
  deleteNote(id: number) {
    // const headers = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.delete<responseDataType>(
      `${this.defaultRoute}/note/${id}`
      // { headers }
    );
  }
  getSingleNote(id: number) {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.get<singleNoteDataType>(
      `${this.defaultRoute}/note/${id}`
      // {
      //   headers,
      // }
    );
  }
  updateNote(id: number, updatedNote: addNoteDataType) {
    // const token = localStorage.getItem('token');
    // const header = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.patch<responseDataType>(
      `${this.defaultRoute}/note/${id}`,
      updatedNote
      // { headers: { Authorization: `${token}` } }
    );
  }
  getUserDetail() {
    // const token = localStorage.getItem('token');
    // const authHeader = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.get<userDataFromServer>(
      `${this.defaultRoute}/userdetails`
      // {
      //   headers: authHeader,
      // }
    );
  }
  updateUserDetail(data: { userName: string }) {
    // const token = localStorage.getItem('token');
    // const authHeader = new HttpHeaders({
    //   Authorization: `${token}`,
    // });
    return this.http.put(
      `${this.defaultRoute}/userdetails`,
      data
      //   {
      //   headers: authHeader,
      // }
    );
  }
}
