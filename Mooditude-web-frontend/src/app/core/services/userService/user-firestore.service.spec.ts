import { TestBed } from '@angular/core/testing';

import { UserFireStoreService } from './user-firestore.service';

describe('UserFireStoreService', () => {
  let service: UserFireStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFireStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
