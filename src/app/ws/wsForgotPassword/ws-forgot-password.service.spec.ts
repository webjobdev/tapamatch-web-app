import { TestBed } from '@angular/core/testing';

import { WsForgotPasswordService } from './ws-forgot-password.service';

describe('WsForgotPasswordService', () => {
  let service: WsForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
