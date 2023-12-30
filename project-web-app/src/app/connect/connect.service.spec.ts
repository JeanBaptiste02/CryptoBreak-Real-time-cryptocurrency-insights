import { TestBed } from '@angular/core/testing';

import { ConnectService } from '../service/connect.service';

describe('ConnectService', () => {
  let service: ConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
