import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingIntroComponent } from './onboarding-intro.component';

describe('OnboardingIntroComponent', () => {
  let component: OnboardingIntroComponent;
  let fixture: ComponentFixture<OnboardingIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
