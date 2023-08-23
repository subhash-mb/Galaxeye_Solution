import { TestBed } from '@angular/core/testing';

import { JsondataService } from './jsondata.service';

describe('JsondataService', () => {
  let service: JsondataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsondataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
