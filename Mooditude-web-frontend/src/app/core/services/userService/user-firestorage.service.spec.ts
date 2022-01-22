import { TestBed } from '@angular/core/testing';

import { UserFirestorageService } from './user-firestorage.service';

describe('UserFirestorageService', () => {
  let service: UserFirestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFirestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
