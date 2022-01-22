import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SignupWithNameEmailService } from "src/app/core/services/signupWithNameEmail/signup-with-name-email.service"
import { Signup } from "src/app/models/signup-with-name-email"

@Component({
  selector: 'app-sign-up-name-email',
  templateUrl: './sign-up-name-email.component.html',
  styleUrls: ['./sign-up-name-email.component.css']
})
export class SignUpNameEmailComponent implements OnInit {

  signupForm: FormGroup
  singupFormSubmitted: boolean = false
  loading: boolean = false
  error: string = ''
  signUpWithNameEmail: Signup
  modalRef: BsModalRef;

  @ViewChild('open_signUpWithNameEmail', { static: true }) open_signUpWithNameEmail: any;

  constructor(private formbulider: FormBuilder,
    private signUpService: SignupWithNameEmailService,
    private modalService: BsModalService,
    private router : Router) { }

  ngOnInit(): void {
   
    this.initSignupForm()
  }

  initSignupForm() {
    this.signupForm = this.formbulider.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get fsignup() {
    return this.signupForm.controls
  }

  public get signUpFirestore(): Signup {
    return this.signUpWithNameEmail = {
      name: this.fsignup.name.value,
      email: this.fsignup.email.value
    }
  }

  onSignup() {
    this.singupFormSubmitted = true
    if (this.signupForm.invalid) {
      return
    }
    this.signUpService.create(this.signUpFirestore)
      .then(() => {
        this.openModal(this.open_signUpWithNameEmail, 'custModal wd600')
      }).catch((error) => {
        console.error(error.message)
      })
  }

  openModal(template: TemplateRef<any>, cls: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  closeModel() {
    this.modalRef.hide();
  }

  gotoHome(){
    this.router.navigate(['home'])
  }
}
