import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SetSeoService } from '../../../services/seo/set-seo.service';
import { HttpService } from '../../../services/http/http.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { responseDataType } from '../../../types/dataTypes';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockSeoService: jasmine.SpyObj<SetSeoService>;
  let mockHttpService: jasmine.SpyObj<HttpService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSeoService = jasmine.createSpyObj('SetSeoService', ['setSeo']);
    mockHttpService = jasmine.createSpyObj('HttpService', ['logIn']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: SetSeoService, useValue: mockSeoService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should redirect if token exists and set SEO', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'home'], {
      replaceUrl: true,
    });
    expect(mockSeoService.setSeo).toHaveBeenCalled();
  });

  it('should login successfully and navigate to home', fakeAsync(() => {
    const mockForm: any = {
      valid: true,
      value: {
        userEmail: 'test@test.com',
        userPassword: '123456',
      },
    };

    const response: responseDataType = {
      token: 'abc123',
      message: 'Login successful',
      errorStatus: false,
    };

    spyOn(localStorage, 'setItem');

    mockHttpService.logIn.and.returnValue(of(response));

    component.loginHandler(mockForm);

    // immediately after call
    expect(component.loginButtonDisable).toBeTrue();

    tick(1000);

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'Bearer abc123');

    expect(component.reponseMessage).toBe('Login successful');
    expect(component.errorStatus).toBeFalse();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);

    flush();

    expect(component.loginButtonDisable).toBeFalse();
  }));

  it('should handle login failure response', fakeAsync(() => {
    const mockForm: any = {
      valid: true,
      value: {
        userEmail: 'test@test.com',
        userPassword: 'wrong',
      },
    };

    const response: responseDataType = {
      message: 'Invalid credentials',
      errorStatus: true,
    };

    mockHttpService.logIn.and.returnValue(of(response));

    component.loginHandler(mockForm);

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe('Invalid credentials');
    expect(component.loginButtonDisable).toBeTrue();

    tick(2000);

    expect(component.errorStatus).toBeFalse();
    expect(component.reponseMessage).toBe('');
  }));

  it('should handle API error', fakeAsync(() => {
    const mockForm: any = {
      valid: true,
      value: {
        userEmail: 'test@test.com',
        userPassword: '123456',
      },
    };

    mockHttpService.logIn.and.returnValue(
      throwError(() => new Error('Server error'))
    );

    component.loginHandler(mockForm);

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe(
      'unable to communitcate to our backend service'
    );
    expect(component.loginButtonDisable).toBeTrue();

    tick(2000);

    expect(component.errorStatus).toBeFalse();
    expect(component.reponseMessage).toBe('');
  }));

  it('should show error when form is invalid', fakeAsync(() => {
    const mockForm: any = {
      valid: false,
      value: {},
    };

    component.loginHandler(mockForm);

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe('please check your data');
    expect(component.loginButtonDisable).toBeFalse();

    tick(3000);

    expect(component.reponseMessage).toBe('');
  }));
});
