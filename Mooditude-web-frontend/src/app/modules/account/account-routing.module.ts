import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from "./sign-up/sign-up.component"
import { LoginComponent } from "./login/login.component"
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { AccountComponent } from "./account/account.component"
import { OnboardingIntroComponent } from "./onboarding-intro/onboarding-intro.component"
import { OnBoardingComponent } from "./on-boarding/on-boarding.component"
import { SignUpNameEmailComponent } from "./sign-up-name-email/sign-up-name-email.component"


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      // {
      //   path: 'signup',
      //   component: SignUpComponent
      // },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'introduction',
        component: OnboardingIntroComponent
      },
      {
        path: 'onboarding',
        component: OnBoardingComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
