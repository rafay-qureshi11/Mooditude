import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding/onboarding.service'
@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss']
})

export class OnBoardingComponent implements OnInit {

  constructor(private elRef: ElementRef,
    private router: Router,
    private _onBoarding: OnboardingService) { }

  body = document.body;
  onBoardScreen: number = 1
  ages = ['Teen', '20s', '30s', '40s', '50s', '60s', '70+']
  genders = ['Male', 'Female', 'Transgender', 'Non-binary', 'I prefer another identy', 'I prefer nott to say']
  sexualOrientations = ['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Questioning', 'Queer', 'Asexual', 'Other', 'I prefer not to say']
  maritalStatuses = ['Single', 'In a relationship', 'Married', 'Seperated', 'Divorced', 'Widowed', 'I prefer not to say']
  raceIdentities = ['White', 'African American or Black', 'Asian', 'Hispanic, Latino, or Spanish Origin', 'Native Hawaiian / Pacific Islander', 'Multiracial', 'Other']
  employments = ['Full-time Employee', 'Part-time Employee', 'Student & Employee', 'Freelancer', 'Business Owner', 'Homemaker', 'Stay-at-home Parent', 'Retired', 'Unemployeed', 'I prefer not to say']
  answerWeight = [{ name: 'Most of the time', weight: 4 }, { name: 'Often', weight: 3 }, { name: 'Sometime', weight: 2 }, { name: 'Rarely', weight: 1 }, { name: 'Not at all', weight: 0 }]


  ngOnInit(): void {
    this.body.classList.add('wave-background');
  }
  get mentalHealth() {
    return this._onBoarding.mentalHealth;
  }

  set mentalHealth(value) {
    this._onBoarding.mentalHealth = value;
  }

  public get onBoarding(): OnboardingService {
    return this._onBoarding;
  }
  public set onBoarding(value: OnboardingService) {
    this._onBoarding = value;
  }

  isShowLogo(isShow: boolean) {
    var img = document.getElementById('onboarding-logo');
    img ? img.style.visibility = (isShow ? 'visible' : 'hidden') : ''
  }

  onSelectAge(age: string) {
    this.mentalHealth.age = age
  }

  onSelectGender(gender: string) {
    this.mentalHealth.gender = gender
  }

  onSelectSexualOrientation(sexualOrientation: string) {
    this.mentalHealth.sexualOrientation = sexualOrientation
  }

  onSelectMaritalStatus(maritalStatus: string) {
    this.mentalHealth.maritalStatus = maritalStatus
  }

  onSelectRaceIdentity(raceIdentity: string) {
    this.mentalHealth.raceIdentity = raceIdentity
  }

  onSelectEmployment(employment: string) {
    this.mentalHealth.employment = employment
  }

  onBack(){
    this.onBoardScreen -= 1
    console.log('on boarding back', this.onBoardScreen)
  }

  showContinue = true
  onContinue() {
    this.onBoardScreen += 1
    console.log('on boarding', this.onBoardScreen)
    switch (this.onBoardScreen) {
      case 42: {
        //this.showContinue = false
        // setTimeout(() => {
        //   // this.onBoardScreen += 1
        //   // var doc = document.getElementById('onBoardScreen')
        //   // doc!.click()
        //   this.showContinue = true
        // }, 1000)
        break
      }
      case 48: {
        this.onBoarding.onSave()
        break
      }
      default: {
        break
      }
    }
  }
}
