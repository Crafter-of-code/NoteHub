import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailEditorComponent } from './user-detail-editor.component';

describe('UserDetailEditorComponent', () => {
  let component: UserDetailEditorComponent;
  let fixture: ComponentFixture<UserDetailEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
