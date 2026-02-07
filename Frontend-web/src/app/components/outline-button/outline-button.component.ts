import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-outline-button',
  imports: [],
  templateUrl: './outline-button.component.html',
  styleUrl: './outline-button.component.css',
})
export class OutlineButtonComponent {
  @Input() buttonHeading: String = '';
  @Input() operationFunction!: () => void;
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }
}
