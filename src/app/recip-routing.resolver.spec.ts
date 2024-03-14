import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { recipRoutingResolver } from './recip-routing.resolver';

describe('recipRoutingResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => recipRoutingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
