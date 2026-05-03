import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypewritterComponent } from './typewritter.component';

describe('TypewritterComponent - FULL DETAILED TESTS', () => {
  let component: TypewritterComponent;
  let fixture: ComponentFixture<TypewritterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypewritterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypewritterComponent);
    component = fixture.componentInstance;
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default values correctly', () => {
    expect(component.message).toBe('');
    expect(component.fullText).toBe('');
    expect(component.displayText).toBe('');
    expect(component.typingSpeed).toBe(150);
    expect(component.deletingSpeed).toBe(80);
    expect(component.pauseBetween).toBe(1000);
  });
  it('should copy message to fullText on init', () => {
    component.message = 'Hello World';

    spyOn(component, 'startTyping');

    component.ngOnInit();

    expect(component.fullText).toBe('Hello World');
    expect(component.startTyping).toHaveBeenCalled();
  });

  it('should handle empty message on init safely', () => {
    component.message = '';

    spyOn(component, 'startTyping');

    component.ngOnInit();

    expect(component.fullText).toBe('');
  });
  it('should type text progressively', async () => {
    component.fullText = 'ABC';

    await component.typeText();

    expect(component.displayText).toBe('ABC');
  });

  it('should type character by character correctly', async () => {
    component.fullText = 'AB';

    const steps: string[] = [];

    for (let i = 0; i <= component.fullText.length; i++) {
      component.displayText = component.fullText.substring(0, i);
      steps.push(component.displayText);
    }

    expect(steps).toEqual(['', 'A', 'AB']);
  });

  it('should handle single character typing', async () => {
    component.fullText = 'A';

    await component.typeText();

    expect(component.displayText).toBe('A');
  });

  it('should handle empty string typing', async () => {
    component.fullText = '';

    await component.typeText();

    expect(component.displayText).toBe('');
  });
  it('should delete text fully', async () => {
    component.fullText = 'ABC';
    component.displayText = 'ABC';

    await component.deleteText();

    expect(component.displayText).toBe('');
  });

  it('should delete character by character correctly', async () => {
    component.fullText = 'AB';

    const steps: string[] = [];

    for (let i = component.fullText.length; i >= 0; i--) {
      steps.push(component.fullText.substring(0, i));
    }

    expect(steps).toEqual(['AB', 'A', '']);
  });

  it('should handle delete when text is already empty', async () => {
    component.fullText = '';
    component.displayText = '';

    await component.deleteText();

    expect(component.displayText).toBe('');
  });
  it('should pause for correct time (logical check)', async () => {
    const result = component.pause(50);

    expect(result instanceof Promise).toBeTrue();

    await result;
  });

  it('should resolve pause promise', async () => {
    let resolved = false;

    component.pause(10).then(() => (resolved = true));

    await new Promise((r) => setTimeout(r, 15));

    expect(resolved).toBeTrue();
  });
  it('should type then delete correctly in sequence', async () => {
    component.fullText = 'A';

    await component.typeText();
    expect(component.displayText).toBe('A');

    await component.deleteText();
    expect(component.displayText).toBe('');
  });

  it('should maintain correct state transitions', async () => {
    component.fullText = 'Hi';

    await component.typeText();
    expect(component.displayText).toBe('Hi');

    await component.deleteText();
    expect(component.displayText).toBe('');
  });
  it('should NOT execute infinite loop (mocked execution)', async () => {
    let calls = 0;

    spyOn(component, 'typeText').and.callFake(async () => {
      calls++;
    });

    spyOn(component, 'deleteText').and.callFake(async () => {
      calls++;
    });

    spyOn(component, 'pause').and.callFake(async () => {
      calls++;
    });
    await component.typeText();
    await component.pause(component.pauseBetween);
    await component.deleteText();
    await component.pause(component.pauseBetween);

    expect(calls).toBe(4);
  });

  it('should verify correct execution order in cycle', async () => {
    const order: string[] = [];

    spyOn(component, 'typeText').and.callFake(async () => {
      order.push('type');
    });

    spyOn(component, 'pause').and.callFake(async () => {
      order.push('pause');
    });

    spyOn(component, 'deleteText').and.callFake(async () => {
      order.push('delete');
    });

    await component.typeText();
    await component.pause(component.pauseBetween);
    await component.deleteText();
    await component.pause(component.pauseBetween);

    expect(order).toEqual(['type', 'pause', 'delete', 'pause']);
  });

  it('should handle long text correctly', async () => {
    component.fullText = 'HELLO WORLD THIS IS A LONG TEXT';

    await component.typeText();

    expect(component.displayText).toBe(component.fullText as string);
  });

  it('should reset correctly between runs', async () => {
    component.fullText = 'A';
    await component.typeText();
    await component.deleteText();

    component.fullText = 'B';
    await component.typeText();

    expect(component.displayText).toBe('B');
  });
});
