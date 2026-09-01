import { TestBed } from '@angular/core/testing';

import { WsSignupService } from './ws-signup.service';

describe('WsSignupService', () => {
  let service: WsSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
