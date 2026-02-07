import { Component } from '@angular/core';
import { footerHeadLine } from '../../constants/appDetails';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerHeadLine?: string = footerHeadLine;
}
