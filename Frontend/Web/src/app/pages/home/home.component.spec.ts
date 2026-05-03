import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { HttpService } from '../../services/http/http.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { notesDataType, responseDataType } from '../../types/dataTypes';
import { of, throwError } from 'rxjs';

describe('home-component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSeoService: jasmine.SpyObj<SetSeoService>;
  let mockHttpService: jasmine.SpyObj<HttpService>;
  let mockRouter: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    mockSeoService = jasmine.createSpyObj('SetSeoService', ['setSeo']);
    mockHttpService = jasmine.createSpyObj('HttpService', [
      'getHomeData',
      'deleteNote',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockHttpService.deleteNote.calls.reset();

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: SetSeoService, useValue: mockSeoService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });
  it('should set seo and fetch note on Initialized', () => {
    const notes: notesDataType = [
      {
        noteId: 1,
        noteTitle: 'Test',
        noteContent: 'Content',
        createdAt: new Date(),
      },
    ];
    mockHttpService.getHomeData.and.returnValue(of(notes));
    component.ngOnInit();
    expect(mockHttpService.getHomeData).toHaveBeenCalled();
    expect(component.allNotes.length).toBe(1);
    expect(mockSeoService.setSeo).toHaveBeenCalled();
  });
  it('should handle getAllNote error', fakeAsync(() => {
    mockHttpService.getHomeData.and.returnValue(
      throwError(() => new Error('API erro'))
    );
    component.getAllNote();
    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe(
      'we are facing some problem while communicating to our server'
    );
    tick(2000);
    expect(component.errorStatus).toBeFalse();
    expect(component.reponseMessage).toBe('');
  }));
  it('should enable edit mode', () => {
    component.editButtonHandler(5);
    expect(component.noteId).toBe(5);
    expect(component.isEditingMode).toBeTrue();
    expect(component.showAddEditNote).toBeTrue();
  });
  it('should toggle add/edit', () => {
    mockHttpService.getHomeData.and.returnValue(of([]));
    component.showAddEditNote = false;
    component.addEditNote();
    expect(component.showAddEditNote).toBeTrue();
    expect(component.isEditingMode).toBeFalse();
  });
  it('should delete note and referesh list', fakeAsync(() => {
    const response: responseDataType = {
      errorStatus: false,
      message: '',
    };
    mockHttpService.deleteNote.and.returnValue(of(response));
    spyOn(component, 'getAllNote');
    component.deleteButtonHandler(1);
    tick(2000);
    expect(component.reponseMessage).toBe('');
  }));
  it('should handle delete error response', () => {
    mockHttpService.deleteNote.and.returnValue(
      throwError(() => 'Delete failed')
    );

    component.deleteButtonHandler(1);

    expect(component.errorStatus).toBeFalse();
    expect(component.reponseMessage).toBe('Delete failed');
  });
  it('should delete note and refresh list', (done) => {
    const response: responseDataType = {
      errorStatus: false,
      message: '',
    };

    mockHttpService.deleteNote.and.returnValue(of(response));

    spyOn(component, 'getAllNote');

    component.deleteButtonHandler(1);

    setTimeout(() => {
      expect(component.reponseMessage).toBe('');
      expect(component.getAllNote).toHaveBeenCalled();
      done();
    }, 0);
  });
  it('should handle response status event', fakeAsync(() => {
    const event: responseDataType = {
      errorStatus: true,
      message: 'Something happened',
    };

    component.responseStatusHandler(event);

    expect(component.errorStatus).toBeTrue();
    expect(component.reponseMessage).toBe('Something happened');

    tick(3000);

    expect(component.reponseMessage).toBe('');
  }));
});
