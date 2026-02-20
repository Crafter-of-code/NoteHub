import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typewritter',
  imports: [],
  templateUrl: './typewritter.component.html',
  styleUrl: './typewritter.component.css',
})
export class TypewritterComponent implements OnInit {
  @Input() message: String = '';
  fullText: String = '';
  displayText = '';
  typingSpeed = 150;
  deletingSpeed = 80;
  pauseBetween = 1000;

  ngOnInit() {
    this.fullText = this.message;
    this.startTyping();
  }

  async startTyping() {
    while (true) {
      await this.typeText();
      await this.pause(this.pauseBetween);
      await this.deleteText();
      await this.pause(this.pauseBetween);
    }
  }

  async typeText() {
    for (let i = 0; i <= this.fullText.length; i++) {
      this.displayText = this.fullText.substring(0, i);
      await this.pause(this.typingSpeed);
    }
  }

  async deleteText() {
    for (let i = this.fullText.length; i >= 0; i--) {
      this.displayText = this.fullText.substring(0, i);
      await this.pause(this.deletingSpeed);
    }
  }

  pause(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
