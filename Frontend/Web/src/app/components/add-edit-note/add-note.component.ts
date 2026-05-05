import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OutlineButtonComponent } from '../outline-button/outline-button.component';
import { HttpService } from '../../services/http/http.service';
import { addNoteDataType, responseDataType } from '../../types/dataTypes';
import { SkeletonUiComponent } from '../skeleton-ui/skeleton-ui.component';

@Component({
  selector: 'app-add-edit-note',
  imports: [
    CommonModule,
    FormsModule,
    OutlineButtonComponent,
    SkeletonUiComponent,
  ],
  templateUrl: './add-edit-note.component.html',
})
export class AddNoteComponent implements OnInit {
  formHeading: string = '';
  buttonHeading: String = 'add note';
  @Input() noteId: number = 0;
  @Input() isEditingMode: boolean = false;
  @Input() showAddEditNote: boolean = true;
  @Output() toggelAddEditNoteShow = new EventEmitter<void>();
  @Output() responseStatusEmitter = new EventEmitter<responseDataType>();
  skeletonUiLoading: boolean = true;
  buttonDisabled: boolean = false;
  noteData = {
    noteTitle: '',
    noteContent: '',
  };
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    if (this.isEditingMode) {
      this.skeletonUiLoading = true;
      this.formHeading = 'Want to make some updates';
      this.buttonHeading = 'Press to update';
      this.http.getSingleNote(this.noteId).subscribe({
        next: (data) => {
          this.noteData.noteTitle = data.noteTitle;
          this.noteData.noteContent = data.noteContent;
          this.skeletonUiLoading = false;
        },
        error: (err) => {
          this.toggelAddEditNoteShow.emit();
          this.responseStatusEmitter.emit({
            errorStatus: true,
            message: 'we are facing some problem while getting you note',
          });
        },
      });
    } else {
      this.skeletonUiLoading = false;
      this.formHeading = 'Want to add new notes';
    }
  }
  addOrEditHandler(noteForm: NgForm) {
    this.buttonDisabled = true;
    if (this.isEditingMode) {
      const updatedNote: addNoteDataType = {
        noteTitle: noteForm.value.noteTitle,
        noteContent: noteForm.value.noteContent,
      };
      this.http.updateNote(this.noteId, updatedNote).subscribe({
        next: (data) => {
          this.toggelAddEditNoteShow.emit();
          this.responseStatusEmitter.emit({
            message: data.message,
            errorStatus: data.errorStatus,
          });
        },
        error: (err) => {
          this.toggelAddEditNoteShow.emit();
          this.responseStatusEmitter.emit({
            message: 'Something went wrong while updating the note',
            errorStatus: true,
          });
        },
        complete: () => {
          this.buttonDisabled = false;
        },
      });
    } else {
      if (noteForm.valid) {
        const data: addNoteDataType = {
          noteTitle: noteForm.value.noteTitle,
          noteContent: noteForm.value.noteContent,
        };
        this.http.addNote(data).subscribe({
          next: (data) => {
            this.toggelAddEditNoteShow.emit();
            this.responseStatusEmitter.emit({
              message: data.message,
              errorStatus: false,
            });
          },
          error: (err) => {
            this.toggelAddEditNoteShow.emit();
            this.responseStatusEmitter.emit({
              message: 'Facing some error while adding the note',
              errorStatus: false,
            });
          },
        });
      }
    }
  }
  updateNote() {}
}
