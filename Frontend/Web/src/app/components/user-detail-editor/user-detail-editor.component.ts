import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SolidButtonComponent } from '../solid-button/solid-button.component';
import { HttpService } from '../../services/http/http.service';
import { Router } from '@angular/router';
import { ButtonHandlersService } from '../../services/ButtonHandlers/button-handlers.service';
type responseStatustype = {
  responseStatus: boolean;
  responseMessage: string;
};
@Component({
  selector: 'app-user-detail-editor',
  imports: [CommonModule, FormsModule, SolidButtonComponent],
  templateUrl: './user-detail-editor.component.html',
  styleUrl: './user-detail-editor.component.css',
})
export class UserDetailEditorComponent implements OnInit {
  constructor(
    private http: HttpService,
    private router: Router,
    private routeHandler: ButtonHandlersService
  ) {}
  @Output() toggleHandler = new EventEmitter<boolean>();
  @Output() responseEmitter = new EventEmitter<responseStatustype>();
  placeHolder: string = '';
  @Input() editOperation: string = '';
  @Input() defaultValueToEdit: string = '';
  buttonDisabled: boolean = false;
  typeOfinput: string = '';

  ngOnInit(): void {
    if (this.editOperation == 'userEmail') {
      this.typeOfinput = 'email';
    } else {
      this.typeOfinput = 'text';
    }
  }
  updateHandler(updatedData: NgForm) {
    this.buttonDisabled = true;
    this.http.updateUserDetail(updatedData.value).subscribe({
      next: (data) => {
        this.responseEmitter.emit({
          responseStatus: false,
          responseMessage: 'Detail has been edited',
        });
        if (this.editOperation == 'userEmail') {
          this.routeHandler.goToLoginPage();
        } else if (this.editOperation == 'userPassword') {
          this.routeHandler.goToLoginPage();
        }
      },
      error: (err) => {
        if (this.editOperation == 'userEmail') {
          if ((err.status = 400)) {
            this.responseEmitter.emit({
              responseStatus: true,
              responseMessage: 'This email is already present',
            });
          }
        } else {
          this.responseEmitter.emit({
            responseStatus: true,
            responseMessage:
              'we are facing some problem while updating you detail',
          });
        }
        console.log(err);
      },
      complete: () => {
        this.buttonDisabled = false;
      },
    });
  }
  toggelHandlerButton() {
    this.toggleHandler.emit(false);
  }
}
