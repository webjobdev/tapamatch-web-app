import { TestBed } from '@angular/core/testing';

import { WsListService } from './ws-list.service';

describe('WsListService', () => {
  let service: WsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
