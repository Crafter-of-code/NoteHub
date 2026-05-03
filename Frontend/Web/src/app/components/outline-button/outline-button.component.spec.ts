import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutlineButtonComponent } from './outline-button.component';

describe('OutlineButtonComponent', () => {
  let component: OutlineButtonComponent;
  let fixture: ComponentFixture<OutlineButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutlineButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutlineButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input values', () => {
    const mockFn = jasmine.createSpy('operationFunction');

    component.buttonHeading = 'Click Me';
    component.operationFunction = mockFn;
    component.disabled = false;

    expect(component.buttonHeading).toBe('Click Me');
    expect(component.operationFunction).toBeDefined();
    expect(component.disabled).toBeFalse();
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

  it('should allow operationFunction to be assigned', () => {
    const mockFn = jasmine.createSpy('operationFunction');

    component.operationFunction = mockFn;

    expect(typeof component.operationFunction).toBe('function');
  });

  it('should not change state on click (stateless component)', () => {
    const initialDisabled = component.disabled;

    component.onClick();

    expect(component.disabled).toBe(initialDisabled);
  });
});
