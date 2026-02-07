import { Injectable, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
type metaData = {
  title?: string;
  description?: string;
  keyword?: string;
};
@Injectable({
  providedIn: 'root',
})
export class SetSeoService implements OnInit {
  constructor(private title: Title, private meta: Meta) {}
  ngOnInit(): void {}
  setSeo(data: metaData) {
    if (data.title) {
      this.title.setTitle(data.title);
    }
    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
    }
    if (data.keyword) {
      this.meta.updateTag({ name: 'keywords', content: data.keyword });
    }
  }
}
