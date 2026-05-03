import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { SetSeoService } from '../../../services/seo/set-seo.service';
import { HttpService } from '../../../services/http/http.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockSeo: jasmine.SpyObj<SetSeoService>;
  let mockHttp: jasmine.SpyObj<HttpService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSeo = jasmine.createSpyObj('SetSeoService', ['setSeo']);
    mockHttp = jasmine.createSpyObj('HttpService', ['signIn']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SigninComponent],
      providers: [
        { provide: SetSeoService, useValue: mockSeo },
        { provide: HttpService, useValue: mockHttp },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function fillValidForm() {
    component.signinForm.setValue({
      name: 'John',
      email: 'john@test.com',
      password: '123456',
      confirmPassword: '123456',
      checkBox: true,
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO on init', () => {
    expect(mockSeo.setSeo).toHaveBeenCalled();
  });

  it('should show error if form is invalid', fakeAsync(() => {
    component.signinForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkBox: false,
    });

    component.signinHandler();

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe('please check your data');

    tick(3000);
    expect(component.reponseMessage).toBe('');
  }));

  it('should not call API if passwords do not match', () => {
    component.signinForm.setValue({
      name: 'John',
      email: 'john@test.com',
      password: '123456',
      confirmPassword: '654321',
      checkBox: true,
    });

    spyOn(console, 'error');

    component.signinHandler();

    expect(console.error).toHaveBeenCalled();
    expect(mockHttp.signIn).not.toHaveBeenCalled();
  });

  it('should call signIn API when form is valid', () => {
    fillValidForm();

    mockHttp.signIn.and.returnValue(
      of({ errorStatus: false, message: 'success' })
    );

    component.signinHandler();

    expect(mockHttp.signIn).toHaveBeenCalledWith({
      userName: 'John',
      userEmail: 'john@test.com',
      userPassword: '123456',
    });
  });

  it('should handle successful signup and navigate to login', fakeAsync(() => {
    fillValidForm();

    mockHttp.signIn.and.returnValue(
      of({ errorStatus: false, message: 'success' })
    );

    component.signinHandler();

    expect(component.reponseMessage).toBe('success');

    tick(2000);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'login']);
    expect(component.reponseMessage).toBe('');
    expect(component.errorStatus).toBeFalse();
  }));

  it('should handle API error', fakeAsync(() => {
    fillValidForm();

    mockHttp.signIn.and.returnValue(throwError(() => new Error('API error')));

    component.signinHandler();

    expect(component.reponseMessage).toBe(
      'problem while communicating to the backed'
    );

    tick(3000);

    expect(component.reponseMessage).toBe('');
  }));
});
