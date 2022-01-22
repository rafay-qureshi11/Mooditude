import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MentalHealth } from "../../models/MentalHealth"
import { MentalHealthFirestoreService } from '../../core/services/mentalHealthService/mental-health-firestore.service';

@Injectable({
  providedIn: 'root'
})

export class OnboardingService {

  constructor(private firestore: MentalHealthFirestoreService,
    private auth : AuthenticationService,
    private router: Router) { }

  private _invitationCode: string = '';

  private _mentalHealth: MentalHealth = {
    age: '',
    gender: '',
    sexualOrientation: '',
    maritalStatus: '',
    raceIdentity: '',
    employment: '',
    depressionQuestions: {
      feelSad: 3,
      cantConcentrate: 3,
      nothingSeemsPleasure: 3,
      feelTried: 3,
      thoughtsSuicide: 3,
      difficultySleeping: 3,
      sleepToMuch: 3,
      lostAppetite: 3,
      eatingMore: 3,
      likeliHoodDepression: '',
      riskScoringDepression: 0
    },
    anxietyQuestions: {
      feelTense: 3,
      feelWorried: 3,
      attacksofAnxiety: 3,
      worryDying: 3,
      socialSituations: 3,
      PTSDQuestions: {
        nightmares: 3,
        feelStartled: 3,
        avoidPlaces: 3,
        feelDull: 3,
        riskScoringPTSD: 0,
        likeliHoodPTSD: ''
      },
      cantGetThoughtsOutofMind: 3,
      repeatCertainActs: 3,
      needToCheckAndRecheck: 3,
      likeliHoodAnxiety: '',
      riskScoringAnxiety: 0,
    },
    bipolarDisorderQustions: {
      moreEnergy: 3,
      feltIrritable: 3,
      feltExcited: 3,
      neededLessSleep: 3,
      riskScoringBipolarDisorder: 0,
      likeliHoodBipolarDisorder: ''
    },
    functionalImpairmentQuestions: {
      interferesWithWork: 3,
      affectsRelationships: 3,
      hasLedToUsingAlcohol: 3,
      hasLedToUsingOtherSubstances: 3,
      riskScoringFunctionalImpairment: 0,
      likeliHoodFunctionalImpairment:''
    },
    riskScoringMentalHealth: 0,
    likeliHoodMentalHealth: ''
  };

  public get mentalHealth() {
    return this._mentalHealth;
  }

  public set mentalHealth(value) {
    this._mentalHealth = value;
  }

  public get invitationCode(): string {
    return this._invitationCode;
  }

  public set invitationCode(value: string) {
    this._invitationCode = value;
  }

  get likeliHoodMentalHealth(): string {
    var mentalHealthScore = this.riskScoringMentalHealth
    var likelihood = ''
    if (mentalHealthScore <= 1) {
      likelihood = 'Unlikely'
    } else if (mentalHealthScore > 1 && mentalHealthScore <= 32) {
      likelihood = 'Low'
    } else if (mentalHealthScore > 32 && mentalHealthScore <= 50) {
      likelihood = 'Medium'
    } else if (mentalHealthScore > 50) {
      likelihood = 'High'
    }
    return likelihood
  }

  get likeliHoodDepression(): string {
    var mentalHealthScore = this.riskScoringDepression
    var likelihood = ''
    if (mentalHealthScore <= 4) {
      likelihood = 'Unlikely'
    } else if (mentalHealthScore > 4 && mentalHealthScore <= 7) {
      likelihood = 'Low'
    } else if (mentalHealthScore > 7 && mentalHealthScore <= 10) {
      likelihood = 'Medium'
    } else if (mentalHealthScore > 10) {
      likelihood = 'High'
    }
    return likelihood
  }

  get likeliHoodAnxiety(): string {
    var mentalHealthScore = this.riskScoringAnxiety
    var likelihood = ''
    if (mentalHealthScore <= 2) {
      likelihood = 'Unlikely'
    } else if (mentalHealthScore > 2 && mentalHealthScore <= 5) {
      likelihood = 'Low'
    } else if (mentalHealthScore > 5 && mentalHealthScore <= 11) {
      likelihood = 'Medium'
    } else if (mentalHealthScore > 11) {
      likelihood = 'High'
    }
    return likelihood
  }

  get likeliHoodPTSD(): string {
    var mentalHealthScore = this.riskScoringPTSD
    var likelihood = ''
    if (mentalHealthScore <= 1) {
      likelihood = 'Unlikely'
    } else if (mentalHealthScore > 1 && mentalHealthScore <= 3) {
      likelihood = 'Low'
    } else if (mentalHealthScore > 3 && mentalHealthScore <= 5) {
      likelihood = 'Medium'
    } else if (mentalHealthScore > 5) {
      likelihood = 'High'
    }
    return likelihood
  }

  get likeliHoodBipolarDisorder(): string {
    var mentalHealthScore = this.riskScoringBipolarDisorder
    var likelihood = ''
    if (mentalHealthScore <= 1) {
      likelihood = 'Unlikely'
    } else if (mentalHealthScore > 1 && mentalHealthScore <= 3) {
      likelihood = 'Low'
    } else if (mentalHealthScore > 3 && mentalHealthScore <= 6) {
      likelihood = 'Medium'
    } else if (mentalHealthScore > 6) {
      likelihood = 'High'
    }
    return likelihood
  }

  get riskScoringDepression(): number {
    return this.mentalHealth.depressionQuestions.feelSad + this.mentalHealth.depressionQuestions.cantConcentrate + this.mentalHealth.depressionQuestions.nothingSeemsPleasure +
      this.mentalHealth.depressionQuestions.feelTried + this.mentalHealth.depressionQuestions.thoughtsSuicide +
      (this.mentalHealth.depressionQuestions.difficultySleeping > this.mentalHealth.depressionQuestions.sleepToMuch ? this.mentalHealth.depressionQuestions.difficultySleeping : this.mentalHealth.depressionQuestions.sleepToMuch) +
      (this.mentalHealth.depressionQuestions.lostAppetite > this.mentalHealth.depressionQuestions.eatingMore ? this.mentalHealth.depressionQuestions.lostAppetite : this.mentalHealth.depressionQuestions.eatingMore);
  }

  get riskScoringBipolarDisorder(): number {
    return this.mentalHealth.bipolarDisorderQustions.moreEnergy + this.mentalHealth.bipolarDisorderQustions.feltIrritable + this.mentalHealth.bipolarDisorderQustions.feltExcited + this.mentalHealth.bipolarDisorderQustions.neededLessSleep;
  }

  get riskScoringAnxiety(): number {
    return this.mentalHealth.anxietyQuestions.feelTense + this.mentalHealth.anxietyQuestions.feelWorried + this.mentalHealth.anxietyQuestions.attacksofAnxiety + this.mentalHealth.anxietyQuestions.worryDying +
      this.mentalHealth.anxietyQuestions.socialSituations + this.mentalHealth.anxietyQuestions.PTSDQuestions.nightmares + this.mentalHealth.anxietyQuestions.PTSDQuestions.feelStartled + this.mentalHealth.anxietyQuestions.PTSDQuestions.avoidPlaces +
      this.mentalHealth.anxietyQuestions.PTSDQuestions.feelDull + this.mentalHealth.anxietyQuestions.cantGetThoughtsOutofMind + this.mentalHealth.anxietyQuestions.repeatCertainActs + this.mentalHealth.anxietyQuestions.needToCheckAndRecheck;
  }

  get riskScoringPTSD(): number {
    return this.mentalHealth.anxietyQuestions.PTSDQuestions.nightmares + this.mentalHealth.anxietyQuestions.PTSDQuestions.feelStartled + this.mentalHealth.anxietyQuestions.PTSDQuestions.avoidPlaces + this.mentalHealth.anxietyQuestions.PTSDQuestions.feelDull;
  }

  get riskScoringMentalHealth(): number {
    return this.riskScoringDepression + this.riskScoringAnxiety + this.riskScoringBipolarDisorder
  }

  onSave(){
    this.mentalHealth.depressionQuestions.riskScoringDepression = this.riskScoringDepression
    this.mentalHealth.depressionQuestions.likeliHoodDepression = this.likeliHoodDepression

    this.mentalHealth.anxietyQuestions.riskScoringAnxiety = this.riskScoringAnxiety
    this.mentalHealth.anxietyQuestions.likeliHoodAnxiety = this.likeliHoodAnxiety

    this.mentalHealth.anxietyQuestions.PTSDQuestions.riskScoringPTSD = this.riskScoringPTSD
    this.mentalHealth.anxietyQuestions.PTSDQuestions.likeliHoodPTSD = this.likeliHoodPTSD

    this.mentalHealth.bipolarDisorderQustions.riskScoringBipolarDisorder = this.riskScoringBipolarDisorder
    this.mentalHealth.bipolarDisorderQustions.likeliHoodBipolarDisorder = this.likeliHoodBipolarDisorder

    this.mentalHealth.riskScoringMentalHealth = this.riskScoringMentalHealth
    this.mentalHealth.likeliHoodMentalHealth = this.likeliHoodMentalHealth

    this.firestore.create(this.mentalHealth,this.auth.user.uid).
      then(()=>{
        this.router.navigate(['home'])
      })
  }




}
