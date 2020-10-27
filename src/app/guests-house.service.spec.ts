import { TestBed } from '@angular/core/testing';

import { GuestsHouseService } from './guests-house.service';

describe('GuestsHouseService', () => {
  let service: GuestsHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestsHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
