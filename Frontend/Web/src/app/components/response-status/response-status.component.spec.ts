import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseStatusComponent } from './response-status.component';

describe('ResponseStatusComponent', () => {
  let component: ResponseStatusComponent;
  let fixture: ComponentFixture<ResponseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
