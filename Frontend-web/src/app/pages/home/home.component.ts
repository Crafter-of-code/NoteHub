import { Component, OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { homePageSeo } from '../../constants/seoData';
import { notesType } from '../../types/dataTypes';
import { CommonModule } from '@angular/common';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { SolidButtonComponent } from '../../components/solid-button/solid-button.component';
import { AddNoteComponent } from '../../components/add-note/add-note.component';
import { ResponseStatusComponent } from '../../components/response-status/response-status.component';

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
export class HomeComponent implements OnInit {
  errorStatus = false;
  reponseMessage = '';
  userId: string | null = '';
  allNotes: notesType = [];
  add_note: boolean = false;
  button_button_icon = '/asset/add.png';
  constructor(
    private seo: SetSeoService,
    private buttonEvent: ButtonHandlersService,
    private activedRoute: ActivatedRoute,
    private http: HttpService
  ) {}
  getAllNote() {
    this.http.getHomeData().subscribe({
      next: (data) => {
        console.log(data);
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
    });
  }
  ngOnInit(): void {
    this.seo.setSeo(homePageSeo);
    this.userId = this.activedRoute.snapshot.paramMap.get('id');
    console.log(`Getting id: ${this.userId}`);
    this.getAllNote();
  }
  deleteIcon: string = 'asset/bin.png';
  editIcon: string = 'asset/pencil.png';
  editButtonHandler(id: number) {
    console.log(`edit note ${id}`);
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
  button_clicked() {
    this.add_note = !this.add_note;
    this.getAllNote();
  }
  noteTitle: string = '';
  noteContent: string = '';
  getNoteData() {
    console.log(this.noteTitle, this.noteContent);
  }
}
