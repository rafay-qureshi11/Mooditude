import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any
  loginFormSubmitted: boolean = false
  constructor(private formbulider: FormBuilder,
    private _authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.initLoginForm()
  }


  initLoginForm() {
    this.loginForm = this.formbulider.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  get flogin() {
    return this.loginForm.controls
  }

  onLogin() {
    this.loginFormSubmitted = true
    if (this.loginForm.invalid) {
      return
    }
    this._authentication.SignIn(this.flogin.email.value, this.flogin.password.value)
  }
}
