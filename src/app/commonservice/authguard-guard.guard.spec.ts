import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardGuardGuard } from './authguard-guard.guard';

describe('AuthguardGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardGuardGuard]
    });
  });

  it('should ...', inject([AuthguardGuardGuard], (guard: AuthguardGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
