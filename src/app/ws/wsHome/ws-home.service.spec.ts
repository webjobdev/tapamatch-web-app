import { TestBed } from '@angular/core/testing';

import { WsHomeService } from './ws-home.service';

describe('WsHomeService', () => {
  let service: WsHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
