import { Component, EventEmitter, OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { homePageSeo } from '../../constants/seoData';
import { notesDataType, responseDataType } from '../../types/dataTypes';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { AddNoteComponent } from '../../components/add-edit-note/add-note.component';
import { ResponseStatusComponent } from '../../components/response-status/response-status.component';
//
// injectable detail
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SolidButtonComponent,
    AddNoteComponent,
    ResponseStatusComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
//
// component start from here
//
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
  constructor(
    private nav: Router,
    private seo: SetSeoService,
    // private buttonEvent: ButtonHandlersService,
    // private activedRoute: ActivatedRoute,
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
        if (err.status == 403) {
          if (localStorage.getItem('token')) {
            this.getAllNote();
          } else {
            this.nav.navigate(['not-found']);
            setTimeout(() => {
              this.nav.navigate(['/', 'login']);
            }, 4000);
          }
        } else {
          this.errorStatus = true;
          this.reponseMessage =
            'we are facing some problem while communicating to our server';
          setTimeout(() => {
            this.errorStatus = false;
            this.reponseMessage = '';
          }, 2000);
        }
      },
    });
  }

  editButtonHandler(id: number) {
    this.noteId = id;
    this.isEditingMode = true;
    this.showAddEditNote = true;
  }
  // this is the delete note handler
  deleteButtonHandler(id: number) {
    this.http.deleteNote(id).subscribe({
      next: (data) => {
        this.errorStatus = data.errorStatus;
        this.reponseMessage = data.message;
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
