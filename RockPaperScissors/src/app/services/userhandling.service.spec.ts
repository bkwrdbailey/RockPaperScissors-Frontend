import { TestBed } from '@angular/core/testing';

import { UserhandlingService } from './userhandling.service';

describe('UserhandlingService', () => {
  let service: UserhandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserhandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
