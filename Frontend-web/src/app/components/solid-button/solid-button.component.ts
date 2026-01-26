import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-solid-button',
  imports: [],
  templateUrl: './solid-button.component.html',
  styleUrl: './solid-button.component.css',
})
export class SolidButtonComponent {
  @Input() buttonHeading: String = '';
  // @Input() operationFunction!: () => any;
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }
}
