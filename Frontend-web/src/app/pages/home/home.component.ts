import { Component, OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { homePageSeo } from '../../constants/seoData';
import notes, { notesType } from '../../constants/testingNotes';
import { CommonModule } from '@angular/common';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userId: string | null = '';
  allNotes: notesType = notes;
  constructor(
    private seo: SetSeoService,
    private buttonEvent: ButtonHandlersService,
    private activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.seo.setSeo(homePageSeo);
    this.userId = this.activedRoute.snapshot.paramMap.get('id');
  }
  deleteIcon: string = 'asset/bin.png';
  editIcon: string = 'asset/pencil.png';
  editButtonHandler(id: number) {
    console.log(`edit note ${id}`);
  }
  deleteButtonHandler(id: number) {
    console.log(id);
  }
}
