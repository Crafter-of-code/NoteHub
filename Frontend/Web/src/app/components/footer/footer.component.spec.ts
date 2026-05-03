import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { footerHeadLine } from '../../constants/appDetails';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have footerHeadLine defined from constants', () => {
    expect(component.footerHeadLine).toBe(footerHeadLine);
  });

  it('should render footerHeadLine correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain(footerHeadLine);
  });

  it('should allow footerHeadLine to be overridden', () => {
    component.footerHeadLine = 'Custom Footer Text';

    expect(component.footerHeadLine).toBe('Custom Footer Text');
  });
});
