import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseStatusComponent } from './response-status.component';

describe('ResponseStatusComponent', () => {
  let component: ResponseStatusComponent;
  let fixture: ComponentFixture<ResponseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseStatusComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.status).toBeTrue();
    expect(component.message).toBe('');
  });

  it('should accept input values correctly', () => {
    component.status = false;
    component.message = 'Something went wrong';

    expect(component.status).toBeFalse();
    expect(component.message).toBe('Something went wrong');
  });

  it('should update status dynamically', () => {
    component.status = true;
    expect(component.status).toBeTrue();

    component.status = false;
    expect(component.status).toBeFalse();
  });

  it('should update message dynamically', () => {
    component.message = 'Success';
    expect(component.message).toBe('Success');

    component.message = 'Error occurred';
    expect(component.message).toBe('Error occurred');
  });
});
