import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:8080/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
      ],
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  // ---------------- SIGN IN ----------------
  it('should call signIn API', () => {
    const data = {
      userName: 'test',
      userEmail: 'test@mail.com',
      userPassword: '123',
    };

    service.signIn(data).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/signin`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);

    req.flush({ message: 'success' });
  });

  // ---------------- LOGIN ----------------
  it('should call login API', () => {
    const data = {
      userEmail: 'test@mail.com',
      userPassword: '123',
    };

    service.logIn(data).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/login`);
    expect(req.request.method).toBe('POST');

    req.flush({ token: 'abc123' });
  });

  // ---------------- GET NOTES ----------------
  it('should get home data (notes)', () => {
    service.getHomeData().subscribe();

    const req = httpMock.expectOne(`${baseUrl}/notes`);
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  // ---------------- ADD NOTE ----------------
  it('should add note', () => {
    const note = {
      title: 'test',
      content: 'hello',
    } as any;

    service.addNote(note).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/note`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(note);

    req.flush({ message: 'added' });
  });

  // ---------------- DELETE NOTE ----------------
  it('should delete note', () => {
    service.deleteNote(1).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/note/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({ message: 'deleted' });
  });

  // ---------------- SINGLE NOTE ----------------
  it('should get single note', () => {
    service.getSingleNote(1).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/note/1`);
    expect(req.request.method).toBe('GET');

    req.flush({} as any);
  });

  // ---------------- UPDATE NOTE ----------------
  it('should update note', () => {
    const updatedNote = {
      title: 'updated',
      content: 'updated content',
    } as any;

    service.updateNote(1, updatedNote).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/note/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedNote);

    req.flush({ message: 'updated' });
  });

  // ---------------- USER DETAILS ----------------
  it('should get user details', () => {
    service.getUserDetail().subscribe();

    const req = httpMock.expectOne(`${baseUrl}/userdetails`);
    expect(req.request.method).toBe('GET');

    req.flush({ userName: 'test' } as any);
  });

  // ---------------- UPDATE USER ----------------
  it('should update user name', () => {
    const data = { userName: 'updatedName' };

    service.updateUserDetail(data).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/userdetails`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);

    req.flush({ message: 'updated' });
  });
});
