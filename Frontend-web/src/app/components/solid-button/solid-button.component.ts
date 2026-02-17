import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solid-button',
  imports: [],
  templateUrl: './solid-button.component.html',
  styleUrl: './solid-button.component.css',
})
export class SolidButtonComponent {
  @Input() buttonHeading: String = '';
  @Input() title: string = '';
  @Input() aria_label: string = '';
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }
}
