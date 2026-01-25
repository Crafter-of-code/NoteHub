import { TestBed } from '@angular/core/testing';

import { ButtonHandlersService } from './button-handlers.service';

describe('ButtonHandlersService', () => {
  let service: ButtonHandlersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonHandlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
