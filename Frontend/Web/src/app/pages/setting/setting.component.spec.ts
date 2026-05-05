import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flushMicrotasks,
} from '@angular/core/testing';
import { SettingComponent } from './setting.component';
import { Router } from '@angular/router';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { HttpService } from '../../services/http/http.service';
import { of, throwError } from 'rxjs';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;
  let mockSeoService: jasmine.SpyObj<SetSeoService>;
  let mockHttpService: jasmine.SpyObj<HttpService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSeoService = jasmine.createSpyObj('SetSeoService', ['setSeo']);
    mockHttpService = jasmine.createSpyObj('HttpService', ['getUserDetail']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SettingComponent],
      providers: [
        { provide: SetSeoService, useValue: mockSeoService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
  });

  it('should call SEO service and fetch user details on init', fakeAsync(() => {
    mockHttpService.getUserDetail.and.returnValue(
      of({ userName: 'John', userEmail: 'john@test.com' })
    );

    component.ngOnInit();
    flushMicrotasks();

    expect(mockSeoService.setSeo).toHaveBeenCalled();
    expect(mockHttpService.getUserDetail).toHaveBeenCalled();
    expect(component.userData.userName).toBe('John');
    expect(component.userData.userEmail).toBe('john@test.com');
  }));

  it('should handle error and set response message', fakeAsync(() => {
    mockHttpService.getUserDetail.and.returnValue(
      throwError(() => ({ status: 500 }))
    );

    component.ngOnInit();
    flushMicrotasks();

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toContain(
      'we are facing some error while getting the user detail'
    );

    tick(3000);

    expect(component.errorStatus).toBeFalse();
    expect(component.reponseMessage).toBe('');
  }));

  it('should navigate to login on 403 error', fakeAsync(() => {
    mockHttpService.getUserDetail.and.returnValue(
      throwError(() => ({ status: 403 }))
    );

    component.ngOnInit();
    flushMicrotasks();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should reset response message after timeout', fakeAsync(() => {
    component.responseSetter(true, 'Error occurred');

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe('Error occurred');

    tick(3000);

    expect(component.errorStatus).toBeFalse();
    expect(component.reponseMessage).toBe('');
  }));

  it('should toggle username editor', () => {
    component.userData.userName = 'John';

    component.toggleShowEditorForUserName();

    expect(component.showEditor).toBeTrue();
    expect(component.editOperation).toBe('userName');
    expect(component.defaultValueToEdit).toBe('John');
  });

  it('should toggle email editor', () => {
    component.userData.userEmail = 'john@test.com';

    component.toggleShowEditorForUserEmail();

    expect(component.showEditor).toBeTrue();
    expect(component.editOperation).toBe('userEmail');
    expect(component.defaultValueToEdit).toBe('john@test.com');
  });

  it('should toggle password editor', () => {
    component.toggleShowEditorForUserPassword();

    expect(component.showEditor).toBeTrue();
    expect(component.editOperation).toBe('userPassword');
    expect(component.defaultValueToEdit).toBe('*********');
  });
});
