import { TestBed } from '@angular/core/testing';

import { DetailExtractCurrencyService } from './detail-extract-currency.service';

describe('DetailExtractCurrencyService', () => {
  let service: DetailExtractCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailExtractCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
