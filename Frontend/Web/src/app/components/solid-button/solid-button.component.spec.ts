import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolidButtonComponent } from './solid-button.component';

describe('SolidButtonComponent', () => {
  let component: SolidButtonComponent;
  let fixture: ComponentFixture<SolidButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolidButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolidButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input values', () => {
    component.buttonHeading = 'Click Me';
    component.title = 'Submit Button';
    component.aria_label = 'submit-btn';
    component.buttonDisabled = true;

    expect(component.buttonHeading).toBe('Click Me');
    expect(component.title).toBe('Submit Button');
    expect(component.aria_label).toBe('submit-btn');
    expect(component.buttonDisabled).toBeTrue();
  });

  it('should emit clicked event when onClick is called', () => {
    spyOn(component.clicked, 'emit');

    component.onClick();

    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should emit clicked event only once per click', () => {
    spyOn(component.clicked, 'emit');

    component.onClick();
    component.onClick();

    expect(component.clicked.emit).toHaveBeenCalledTimes(2);
  });

  it('should not affect state when clicked (stateless component)', () => {
    const initialState = component.buttonDisabled;

    component.onClick();

    expect(component.buttonDisabled).toBe(initialState);
  });
});
