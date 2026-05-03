import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should create request without crashing', () => {
    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem('token', 'abc123');

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');

    expect(req.request.headers.get('Authorization')).toBe('abc123');

    req.flush({});
  });

  it('should NOT add Authorization header when token missing', () => {
    localStorage.removeItem('token');

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');

    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({});
  });

  it('should remove token and navigate on 401 error', () => {
    localStorage.setItem('token', 'abc123');

    http.get('/test').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/test');

    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('token')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should remove token and navigate on 403 error', () => {
    localStorage.setItem('token', 'abc123');

    http.get('/test').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/test');

    req.flush({}, { status: 403, statusText: 'Forbidden' });

    expect(localStorage.getItem('token')).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should NOT navigate on non-auth errors', () => {
    localStorage.setItem('token', 'abc123');

    http.get('/test').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/test');

    req.flush({}, { status: 500, statusText: 'Server Error' });

    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBe('abc123');
  });
});
