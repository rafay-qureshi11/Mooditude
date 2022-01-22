import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any
  forgotPasswordFormSubmitted: boolean = false
  loading = false
  message = ''

  constructor(private formbulider: FormBuilder,
    private _authentication: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.initforgotPasswordForm()
  }

  initforgotPasswordForm() {
    this.forgotPasswordForm = this.formbulider.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get fforgotPassword() {
    return this.forgotPasswordForm.controls
  }

  onForgotPassword() {
  
    this.forgotPasswordFormSubmitted = true
    if (this.forgotPasswordForm.invalid) {
      return
    }
    this.loading = true
    this.message = ''
    this._authentication.ForgotPassword(this.fforgotPassword.email.value).then(
      (res) => {
        this.loading = false
        this.message = "Password reset email on send to your email"
        console.log('Email Send')
        setTimeout(() => {
          this.router.navigate(['account','login'])
        }, 6000);
      },
      (err) => {
        this.loading = false
        this.message = err.message
        console.log('err', err.message)
        // handle errors
      }
    );
  }
}
