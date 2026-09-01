import { TestBed } from '@angular/core/testing';

import { WsProfileService } from './ws-profile.service';

describe('WsProfileService', () => {
  let service: WsProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
