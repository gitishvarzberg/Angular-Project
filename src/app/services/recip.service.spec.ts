import { TestBed } from '@angular/core/testing';

import { RecipService } from './recip.service';

describe('RecipService', () => {
  let service: RecipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
