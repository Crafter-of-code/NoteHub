import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type loginSeccessesMessage = {
  message: string;
};
type responseDataType = {
  errorStatus: boolean;
  message: string;
};
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  defaultRoute: string = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}
  login() {
    return this.http.post<loginSeccessesMessage>(
      `http://localhost:9191/login`,
      { name: 'uzair' }
    );
  }
  signIn(data: { userName: string; userEmail: string; userPassword: string }) {
    return this.http.post<any>(`${this.defaultRoute}/signin`, data);
  }
}
