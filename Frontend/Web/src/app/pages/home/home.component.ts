import { Component, OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { homePageSeo } from '../../constants/seoData';
import { notesDataType, responseDataType } from '../../types/dataTypes';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { AddNoteComponent } from '../../components/add-edit-note/add-note.component';
import { ResponseStatusComponent } from '../../components/response-status/response-status.component';
import { SkeletonUiComponent } from '../../components/skeleton-ui/skeleton-ui.component';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SolidButtonComponent,
    AddNoteComponent,
    ResponseStatusComponent,
    SkeletonUiComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  noteId: number = 0;
  isEditingMode: boolean = false;
  showAddEditNote: boolean = false;
  deleteIcon: string = 'asset/bin.png';
  editIcon: string = 'asset/pencil.png';
  errorStatus: boolean = false;
  reponseMessage = '';
  userId: string | null = '';
  allNotes: notesDataType = [];
  button_button_icon = '/asset/add.png';
  noteLoading: boolean = true;
  constructor(
    private nav: Router,
    private seo: SetSeoService,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.seo.setSeo(homePageSeo);
    this.getAllNote();
  }
  getAllNote() {
    this.http.getHomeData().subscribe({
      next: (data) => {
        this.allNotes = data;
      },
      error: (err) => {
        this.errorStatus = true;
        this.reponseMessage =
          'we are facing some problem while communicating to our server';
        setTimeout(() => {
          this.errorStatus = false;
          this.reponseMessage = '';
        }, 2000);
      },
      complete: () => {
        console.log('operation complete');
        this.noteLoading = false;
      },
    });
  }

  editButtonHandler(id: number) {
    this.noteId = id;
    this.isEditingMode = true;
    this.showAddEditNote = true;
  }
  deleteButtonHandler(id: number) {
    this.http.deleteNote(id).subscribe({
      next: (data) => {
        this.errorStatus = data.errorStatus || true;
        this.reponseMessage = data.message || '';
        setTimeout(() => {
          this.errorStatus = false;
          this.reponseMessage = '';
        }, 2000);
        this.getAllNote();
      },
      error: (err) => {
        this.errorStatus = false;
        this.reponseMessage = err;
      },
    });
  }
  addEditNote() {
    this.showAddEditNote = !this.showAddEditNote;
    this.isEditingMode = false;
    this.getAllNote();
  }
  responseStatusHandler(event: responseDataType) {
    this.errorStatus = !!event.errorStatus;
    this.reponseMessage = event.message ?? '';
    setTimeout(() => {
      this.errorStatus = true;
      this.reponseMessage = '';
    }, 3000);
  }
}
