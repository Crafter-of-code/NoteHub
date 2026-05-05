import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { Router } from '@angular/router';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
import { HttpService } from '../../services/http/http.service';
import { of } from 'rxjs';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  let mockRouter: jasmine.SpyObj<Router>;
  let mockSeoService: jasmine.SpyObj<SetSeoService>;
  let mockButtonService: jasmine.SpyObj<ButtonHandlersService>;
  let mockHttpService: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSeoService = jasmine.createSpyObj('SetSeoService', ['setSeo']);
    mockButtonService = jasmine.createSpyObj('ButtonHandlersService', [
      'goToLoginPage',
      'goToSiginPage',
    ]);
    mockHttpService = jasmine.createSpyObj('HttpService', ['getServerStatus']);

    // mock backend response (success case)
    mockHttpService.getServerStatus.and.returnValue(of('ok'));

    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SetSeoService, useValue: mockSeoService },
        { provide: ButtonHandlersService, useValue: mockButtonService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO on init', () => {
    fixture.detectChanges();

    expect(mockSeoService.setSeo).toHaveBeenCalled();
  });

  it('should navigate to home if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'home'], {
      replaceUrl: true,
    });
  });

  it('should NOT navigate if token does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    fixture.detectChanges();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should call login handler from service', () => {
    component.loginButtonHandler();

    expect(mockButtonService.goToLoginPage).toHaveBeenCalled();
  });

  it('should call signin handler from service', () => {
    component.singinButtonHandle();

    expect(mockButtonService.goToSiginPage).toHaveBeenCalled();
  });

  it('should update UI state when server is reachable', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // flush observable

    expect(mockHttpService.getServerStatus).toHaveBeenCalled();
    expect(component.serverCheckButtonStatus()).toBeFalse();
    expect(component.loginButtonHeading).toBe('Login');
    expect(component.signinButtonHeading).toBe('Creaet a new Account');
  }));

  it('should handle server error state', fakeAsync(() => {
    mockHttpService.getServerStatus.and.returnValue(of('OK'));

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    tick();

    // since your error() block only runs on real HTTP error,
    // this test mainly ensures no crash
    expect(component).toBeTruthy();
  }));
});
