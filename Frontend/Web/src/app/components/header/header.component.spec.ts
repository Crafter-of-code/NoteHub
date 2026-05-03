import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  const mockButtonService = {
    initizalHeaderButton: false,
  };

  const mockActivatedRoute = {
    snapshot: {
      url: [{ path: 'home' }],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ButtonHandlersService, useValue: mockButtonService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize clicked from ButtonHandlersService', () => {
    expect(component.clicked).toBeFalse();
  });

  it('should toggle to setting view when clicked first time', () => {
    component.clicked = false;

    component.button_click();

    expect(component.clicked).toBeTrue();
    expect(component.imageUrl).toBe('asset/home.png');
  });

  it('should toggle back to home when clicked again', () => {
    component.clicked = true;

    component.button_click();

    expect(component.clicked).toBeFalse();
    expect(component.imageUrl).toBe('asset/settings.png');
  });

  it('should logout and navigate to root', async () => {
    const navigateSpy = spyOn(router, 'navigate');

    await component.logoutHandler();

    expect(localStorage.getItem).toBeDefined();
    expect(navigateSpy).toHaveBeenCalledWith(['/'], {
      replaceUrl: true,
    });
  });
});
