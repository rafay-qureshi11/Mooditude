import { TestBed } from '@angular/core/testing';

import { SignupWithNameEmailService } from './signup-with-name-email.service';

describe('SignupWithNameEmailService', () => {
  let service: SignupWithNameEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupWithNameEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
