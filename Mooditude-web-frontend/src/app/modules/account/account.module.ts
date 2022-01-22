import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AccountRoutingModule } from './account-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountComponent } from './account/account.component';
import { OnboardingIntroComponent } from './onboarding-intro/onboarding-intro.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { SignUpNameEmailComponent } from './sign-up-name-email/sign-up-name-email.component';


@NgModule({
  declarations: [
    SignUpComponent, 
    LoginComponent, 
    ForgotPasswordComponent, 
    AccountComponent, 
    OnboardingIntroComponent, 
    OnBoardingComponent, SignUpNameEmailComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class AccountModule { }
