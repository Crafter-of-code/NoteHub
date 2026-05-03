import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailEditorComponent } from './user-detail-editor.component';
import { HttpService } from '../../services/http/http.service';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

describe('UserDetailEditorComponent', () => {
  let component: UserDetailEditorComponent;
  let fixture: ComponentFixture<UserDetailEditorComponent>;

  let mockHttp: jasmine.SpyObj<HttpService>;
  let mockButtonHandler: jasmine.SpyObj<ButtonHandlersService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('HttpService', ['updateUserDetail']);
    mockButtonHandler = jasmine.createSpyObj('ButtonHandlersService', [
      'goToLoginPage',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserDetailEditorComponent, FormsModule],
      providers: [
        { provide: HttpService, useValue: mockHttp },
        { provide: ButtonHandlersService, useValue: mockButtonHandler },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailEditorComponent);
    component = fixture.componentInstance;
  });

  function createMockForm(value: any = { userName: 'Test' }): NgForm {
    return {
      value,
    } as NgForm;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input type to email when editing email', () => {
    component.editOperation = 'userEmail';

    component.ngOnInit();

    expect(component.typeOfinput).toBe('email');
  });

  it('should set input type to text for other operations', () => {
    component.editOperation = 'userName';

    component.ngOnInit();

    expect(component.typeOfinput).toBe('text');
  });

  it('should emit toggle false when toggelHandlerButton is called', () => {
    spyOn(component.toggleHandler, 'emit');

    component.toggelHandlerButton();

    expect(component.toggleHandler.emit).toHaveBeenCalledWith(false);
  });

  it('should update user detail successfully', () => {
    const form = createMockForm();

    component.editOperation = 'userName';

    spyOn(component.responseEmitter, 'emit');

    mockHttp.updateUserDetail.and.returnValue(of({ message: 'success' }));

    component.updateHandler(form);

    expect(mockHttp.updateUserDetail).toHaveBeenCalledWith(form.value);

    expect(component.responseEmitter.emit).toHaveBeenCalledWith({
      responseStatus: false,
      responseMessage: 'Detail has been edited',
    });

    expect(component.buttonDisabled).toBeFalse();
  });

  it('should redirect to login when updating email successfully', () => {
    const form = createMockForm();

    component.editOperation = 'userEmail';

    mockHttp.updateUserDetail.and.returnValue(of({ message: 'ok' }));

    component.updateHandler(form);

    expect(mockButtonHandler.goToLoginPage).toHaveBeenCalled();
  });

  it('should redirect to login when updating password successfully', () => {
    const form = createMockForm();

    component.editOperation = 'userPassword';

    mockHttp.updateUserDetail.and.returnValue(of({ message: 'ok' }));

    component.updateHandler(form);

    expect(mockButtonHandler.goToLoginPage).toHaveBeenCalled();
  });

  it('should handle email already exists error (status 400)', () => {
    const form = createMockForm();

    component.editOperation = 'userEmail';

    spyOn(component.responseEmitter, 'emit');

    mockHttp.updateUserDetail.and.returnValue(
      throwError(() => ({ status: 400 }))
    );

    component.updateHandler(form);

    expect(component.responseEmitter.emit).toHaveBeenCalledWith({
      responseStatus: true,
      responseMessage: 'This email is already present',
    });
  });

  it('should handle generic error', () => {
    const form = createMockForm();

    component.editOperation = 'userName';

    spyOn(component.responseEmitter, 'emit');

    mockHttp.updateUserDetail.and.returnValue(
      throwError(() => ({ status: 500 }))
    );

    component.updateHandler(form);

    expect(component.responseEmitter.emit).toHaveBeenCalledWith({
      responseStatus: true,
      responseMessage: 'we are facing some problem while updating you detail',
    });
  });

  it('should reset buttonDisabled after completion', () => {
    const form = createMockForm();

    mockHttp.updateUserDetail.and.returnValue(of({}));

    component.updateHandler(form);

    expect(component.buttonDisabled).toBeFalse();
  });
});
