import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { HttpService } from '../../services/http/http.service';
import { of, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let mockHttp: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    mockHttp = jasmine.createSpyObj('HttpService', [
      'getSingleNote',
      'addNote',
      'updateNote',
    ]);

    await TestBed.configureTestingModule({
      imports: [AddNoteComponent, FormsModule],
      providers: [{ provide: HttpService, useValue: mockHttp }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
  });

  function createMockForm(valid = true): NgForm {
    return {
      valid,
      value: {
        noteTitle: 'Test Title',
        noteContent: 'Test Content',
      },
    } as NgForm;
  }

  const mockSingleNote = {
    noteId: 1,
    noteTitle: 'Old Title',
    noteContent: 'Old Content',
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in add mode', () => {
    component.isEditingMode = false;

    fixture.detectChanges();

    expect(component.formHeading).toBe('Want to add new notes');
  });

  it('should initialize in edit mode and fetch note', () => {
    component.isEditingMode = true;
    component.noteId = 1;

    mockHttp.getSingleNote.and.returnValue(of(mockSingleNote));

    fixture.detectChanges();

    expect(component.formHeading).toBe('Want to make some updates');
    expect(component.buttonHeading).toBe('Press to update');
    expect(mockHttp.getSingleNote).toHaveBeenCalledWith(1);
    expect(component.noteData.noteTitle).toBe('Old Title');
    expect(component.noteData.noteContent).toBe('Old Content');
  });

  it('should handle error while fetching note in edit mode', () => {
    component.isEditingMode = true;
    component.noteId = 1;

    spyOn(component.toggelAddEditNoteShow, 'emit');
    spyOn(component.responseStatusEmitter, 'emit');

    mockHttp.getSingleNote.and.returnValue(
      throwError(() => new Error('error'))
    );

    fixture.detectChanges();

    expect(component.toggelAddEditNoteShow.emit).toHaveBeenCalled();
    expect(component.responseStatusEmitter.emit).toHaveBeenCalledWith({
      errorStatus: true,
      message: 'we are facing some problem while getting you note',
    });
  });

  it('should add note successfully', () => {
    const form = createMockForm(true);

    spyOn(component.toggelAddEditNoteShow, 'emit');
    spyOn(component.responseStatusEmitter, 'emit');

    mockHttp.addNote.and.returnValue(
      of({ message: 'added', errorStatus: false })
    );

    component.isEditingMode = false;
    component.addOrEditHandler(form);

    expect(mockHttp.addNote).toHaveBeenCalled();
    expect(component.toggelAddEditNoteShow.emit).toHaveBeenCalled();
    expect(component.responseStatusEmitter.emit).toHaveBeenCalledWith({
      message: 'added',
      errorStatus: false,
    });
  });

  it('should handle add note error', () => {
    const form = createMockForm(true);

    spyOn(component.toggelAddEditNoteShow, 'emit');
    spyOn(component.responseStatusEmitter, 'emit');

    mockHttp.addNote.and.returnValue(throwError(() => new Error('error')));

    component.isEditingMode = false;
    component.addOrEditHandler(form);

    expect(component.toggelAddEditNoteShow.emit).toHaveBeenCalled();
    expect(component.responseStatusEmitter.emit).toHaveBeenCalledWith({
      message: 'Facing some error while adding the note',
      errorStatus: false,
    });
  });

  it('should not call addNote if form is invalid', () => {
    const form = createMockForm(false);

    component.isEditingMode = false;
    component.addOrEditHandler(form);

    expect(mockHttp.addNote).not.toHaveBeenCalled();
  });

  it('should update note successfully', () => {
    const form = createMockForm(true);

    spyOn(component.toggelAddEditNoteShow, 'emit');
    spyOn(component.responseStatusEmitter, 'emit');

    mockHttp.updateNote.and.returnValue(
      of({ message: 'updated', errorStatus: false })
    );

    component.isEditingMode = true;
    component.noteId = 1;

    component.addOrEditHandler(form);

    expect(mockHttp.updateNote).toHaveBeenCalledWith(1, {
      noteTitle: 'Test Title',
      noteContent: 'Test Content',
    });

    expect(component.toggelAddEditNoteShow.emit).toHaveBeenCalled();
    expect(component.responseStatusEmitter.emit).toHaveBeenCalledWith({
      message: 'updated',
      errorStatus: false,
    });
  });

  it('should handle update note error', () => {
    const form = createMockForm(true);

    spyOn(component.toggelAddEditNoteShow, 'emit');
    spyOn(component.responseStatusEmitter, 'emit');

    mockHttp.updateNote.and.returnValue(throwError(() => new Error('error')));

    component.isEditingMode = true;
    component.noteId = 1;

    component.addOrEditHandler(form);

    expect(component.toggelAddEditNoteShow.emit).toHaveBeenCalled();
    expect(component.responseStatusEmitter.emit).toHaveBeenCalledWith({
      message: 'Something went wrong while updating the note',
      errorStatus: true,
    });
  });

  it('should re-enable button after update completes', () => {
    const form = createMockForm(true);

    mockHttp.updateNote.and.returnValue(
      of({ message: 'updated', errorStatus: false })
    );

    component.isEditingMode = true;
    component.noteId = 1;

    component.addOrEditHandler(form);

    expect(component.buttonDisabled).toBeFalse();
  });
});
