import { TestBed } from '@angular/core/testing';

import { WsMembersService } from './ws-members.service';

describe('WsMembersService', () => {
  let service: WsMembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsMembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
