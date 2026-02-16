import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OutlineButtonComponent } from '../outline-button/outline-button.component';
import { HttpService } from '../../services/http/http.service';
import { addNoteDataType } from '../../types/dataTypes';

@Component({
  selector: 'app-add-note',
  imports: [CommonModule, FormsModule, OutlineButtonComponent],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css',
})
export class AddNoteComponent {
  constructor(private http: HttpService) {}
  addComponent(noteForm: NgForm) {
    if (noteForm.valid) {
      const data: addNoteDataType = {
        noteTitle: noteForm.value.noteTitle,
        noteContent: noteForm.value.noteContent,
      };
      this.http.addNote(data).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
