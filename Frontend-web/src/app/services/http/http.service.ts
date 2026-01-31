import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type loginSeccessesMessage = {
  message: string;
};
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  defaultRoute: string = 'http://localhost:9191/';
  constructor(private http: HttpClient) {}
  login() {
    return this.http.post<loginSeccessesMessage>(
      `http://localhost:9191/login`,
      { name: 'uzair' }
    );
  }
}
