import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpNameEmailComponent } from './sign-up-name-email.component';

describe('SignUpNameEmailComponent', () => {
  let component: SignUpNameEmailComponent;
  let fixture: ComponentFixture<SignUpNameEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpNameEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpNameEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
