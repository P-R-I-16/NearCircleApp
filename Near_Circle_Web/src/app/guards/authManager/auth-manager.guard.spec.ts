import { TestBed } from '@angular/core/testing';

import { AuthManagerGuard } from './auth-manager.guard';

describe('AuthVendorGuard', () => {
  let guard: AuthManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
