import { Component, OnInit } from '@angular/core';
import { SetSeoService } from '../../services/seo/set-seo.service';
import { homePageSeo } from '../../constants/seoData';
import notes, { notesType } from '../../constants/testingNotes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private seo: SetSeoService) {}
  allNotes: notesType = notes;
  ngOnInit(): void {
    this.seo.setSeo(homePageSeo);
  }
}
