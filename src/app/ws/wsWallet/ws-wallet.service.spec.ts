import { TestBed } from '@angular/core/testing';

import { WsWalletService } from './ws-wallet.service';

describe('WsWalletService', () => {
  let service: WsWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
