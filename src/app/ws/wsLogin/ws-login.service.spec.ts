import { TestBed } from '@angular/core/testing';

import { WsLoginService } from './ws-login.service';

describe('WsLoginService', () => {
  let service: WsLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
