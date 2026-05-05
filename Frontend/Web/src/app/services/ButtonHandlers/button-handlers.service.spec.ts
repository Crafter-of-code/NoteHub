import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ButtonHandlersService } from './button-handlers.service';

describe('ButtonHandlersService', () => {
  let service: ButtonHandlersService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ButtonHandlersService,
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(ButtonHandlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial value of initizalHeaderButton as false', () => {
    expect(service.initizalHeaderButton).toBeFalse();
  });

  it('should navigate to login page', () => {
    service.goToLoginPage();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to signin page', () => {
    service.goToSiginPage();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['signin']);
  });

  it('should navigate to settings page', () => {
    service.getToSettingPage();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['home', 'setting']);
  });

  it('should call correct navigation methods multiple times safely', () => {
    service.goToLoginPage();
    service.goToSiginPage();
    service.getToSettingPage();

    expect(routerSpy.navigate).toHaveBeenCalledTimes(3);
  });

  it('should not modify internal state when navigation methods are called', () => {
    const initial = service.initizalHeaderButton;

    service.goToLoginPage();
    service.goToSiginPage();
    service.getToSettingPage();

    expect(service.initizalHeaderButton).toBe(initial);
  });

  afterEach(() => {
    routerSpy.navigate.calls.reset();
  });
});
