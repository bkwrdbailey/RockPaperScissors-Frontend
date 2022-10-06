import { TestBed } from '@angular/core/testing';

import { GamemoveService } from './gamemove.service';

describe('GamemoveService', () => {
  let service: GamemoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamemoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
