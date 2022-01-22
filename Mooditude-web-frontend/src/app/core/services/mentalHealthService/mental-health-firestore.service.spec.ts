import { TestBed } from '@angular/core/testing';

import { MentalHealthFirestoreService } from './mental-health-firestore.service';

describe('MentalHealthFirestoreService', () => {
  let service: MentalHealthFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentalHealthFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
