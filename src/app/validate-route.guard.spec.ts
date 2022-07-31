import { TestBed } from '@angular/core/testing';

import { ValidateRouteGuard } from './validate-route.guard';

describe('ValidateRouteGuard', () => {
  let guard: ValidateRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidateRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
