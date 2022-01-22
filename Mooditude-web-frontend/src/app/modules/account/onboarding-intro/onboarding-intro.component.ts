import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding/onboarding.service'
import { OnBoardingComponent } from '../on-boarding/on-boarding.component';

@Component({
  selector: 'app-onboarding-intro',
  templateUrl: './onboarding-intro.component.html',
  styleUrls: ['./onboarding-intro.component.css']
})
export class OnboardingIntroComponent implements OnInit {

  introScreen = 1

  constructor(private elRef: ElementRef,
    private router: Router,
    private _onBoarding: OnboardingService) { }

  ngOnInit(): void {
  }

  public get invitationCode(): string {
    return this._onBoarding.invitationCode;
  }
  public set invitationCode(value: string) {
    this._onBoarding.invitationCode = value;
  }

  isShowLogo(isShow: boolean) {
    var img = document.getElementById('onboarding-logo');
    img ? img.style.visibility = (isShow ? 'visible' : 'hidden') : ''
  }

  onContinue() {
    this.introScreen += 1
    if (this.introScreen == 9) {
      this.router.navigate(['account', 'signup'])
    }
  }

}
