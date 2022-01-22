import { TestBed } from '@angular/core/testing';

import { UserDataBaseService } from './user-database.service';

describe('UserDataBaseService', () => {
  let service: UserDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
