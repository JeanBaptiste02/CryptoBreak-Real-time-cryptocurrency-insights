import { TestBed } from '@angular/core/testing';

import { NewsListService } from './news-list.service';

describe('NewsListService', () => {
  let service: NewsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
