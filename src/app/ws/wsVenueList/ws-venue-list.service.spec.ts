import { TestBed } from '@angular/core/testing';

import { WsVenueListService } from './ws-venue-list.service';

describe('WsVenueListService', () => {
  let service: WsVenueListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsVenueListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
