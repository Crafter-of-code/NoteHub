import { TestBed } from '@angular/core/testing';

import { SetSeoService } from './set-seo.service';

describe('SetSeoService', () => {
  let service: SetSeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetSeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
