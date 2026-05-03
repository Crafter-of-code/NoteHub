import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { Router } from '@angular/router';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSeoService: jasmine.SpyObj<SetSeoService>;
  let mockButtonService: jasmine.SpyObj<ButtonHandlersService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSeoService = jasmine.createSpyObj('SetSeoService', ['setSeo']);
    mockButtonService = jasmine.createSpyObj('ButtonHandlersService', [
      'goToLoginPage',
      'goToSiginPage',
    ]);

    await TestBed.configureTestingModule({
      imports: [WelcomeComponent], // standalone
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SetSeoService, useValue: mockSeoService },
        { provide: ButtonHandlersService, useValue: mockButtonService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO on init', () => {
    fixture.detectChanges(); // triggers ngOnInit

    expect(mockSeoService.setSeo).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'NoteHub – Simple & Smart Note Taking App',
      })
    );
  });

  it('should navigate to home if token exists in localStorage', () => {
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
});
