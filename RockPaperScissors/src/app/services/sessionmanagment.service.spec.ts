import { TestBed } from '@angular/core/testing';

import { SessionmanagmentService } from './sessionmanagment.service';

describe('SessionmanagmentService', () => {
  let service: SessionmanagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionmanagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
