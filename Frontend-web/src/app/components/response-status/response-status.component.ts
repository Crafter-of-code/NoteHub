import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response-status',
  imports: [CommonModule],
  templateUrl: './response-status.component.html',
  styleUrl: './response-status.component.css',
})
export class ResponseStatusComponent {
  @Input() status: boolean = true;
  @Input() message: string = '';
}
