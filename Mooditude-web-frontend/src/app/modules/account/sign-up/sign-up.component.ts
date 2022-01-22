import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from "src/app/core/services/authentication/authentication.service"
import { User, user } from "src/app/models/User"
import { UserFireStoreService } from "src/app/core/services/userService/user-firestore.service"
import { UserDataBaseService } from "src/app/core/services/userService/user-database.service"
import { UserFirestorageService } from 'src/app/core/services/userService/user-firestorage.service';
import firebase from 'firebase';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  signupForm: FormGroup
  singupFormSubmitted: boolean = false
  loading: boolean = false
  error: string = ''
  userID: string = ''
  userImage: ''
  dislayImage: string | ArrayBuffer | null

  modalRef: BsModalRef;

  private _userFirestore: User;
  private _userDatabase: user;
  @ViewChild('open_welcomeScreen', { static: true }) open_welcomeScreen: any;

  constructor(private formbulider: FormBuilder,
    private auth: AuthenticationService,
    private firestore: UserFireStoreService,
    private database: UserDataBaseService,
    private firestorage: UserFirestorageService,
    private router: Router,
    private modalService: BsModalService,) {

  }

  ngOnInit(): void {
    this.initSignupForm()
  }

  public get userFirestore(): User {
    return this._userFirestore = {
      activatedRemindersAtStartup: true,
      comittedToSelfhelp: false,
      customerType: '',
      freshChatRestoreID: '',
      goingToTherapy: false,
      knowCbt: false,
      memberSince: new Date(),
      name: this.fsignup.name.value,
      stats: {
        checksCount: 0,
        crownsCount: 0,
        starCount: 0
      },
      topChallenges: [],
      topGoal: '',
      photo: this.fsignup.userImageUrl.value
    }
  }

  public set userFirestore(value: User) {
    this._userFirestore = value;
  }

  public get userDatabase(): user {
    return this._userDatabase = {
      activatedRemindersAtStartup: true,
      customerType: 'free',
      email: this.fsignup.email.value,
      expiryDate: new Date(),
      goingToTherapy: false,
      grantAwardee: false,
      knowCbt: false,
      name: this.fsignup.name.value,
      paymentStatus: '',
      paymentType: '',
      topGoal: ''
    }
  }

  public set userDatabase(value: user) {
    this._userDatabase = value;
  }


  initSignupForm() {
    this.signupForm = this.formbulider.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userImageUrl: ['']
    })
  }

  get fsignup() {
    return this.signupForm.controls
  }

  uploadImage($event: any) {
    this.userImage = $event
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (_event) => {
      this.dislayImage = reader.result;
    }
  }

  onSignup() {
    this.singupFormSubmitted = true
    if (this.signupForm.invalid) {
      return
    }
    this.loading = true
    this.error = ''
    this.auth.SignUp(this.fsignup.email.value, this.fsignup.password.value)
      .then((user) => {
        this.userID = user?.user!.uid
        this.afterUserSignUp(user?.user)
        this.openModal(this.open_welcomeScreen, 'custModal wd600')
        //this.router.navigate(['account', 'onboarding'])
        this.loading = false
      })
      .catch((error) => {
        this.error = error.message
        console.log('error from user', error.message)
      })
  }

  afterUserSignUp(user: firebase.User | null) {
    this.sendEmailOnSignUp(user)

    if (this.userImage !== '' && this.userImage !== undefined && this.userImage !== null) {
      this.firestorage.uploadFile(this.userImage, user?.uid)
      this.firestorage.uploadPercent.subscribe((uploadPercentage) => {
        if (uploadPercentage == 100) {
          this.firestorage.downloadURL.subscribe((url) => {
            this.fsignup.userImageUrl.setValue(url)
            this.auth.updateUserProfile(user, this.fsignup.name.value, url)
            this.firestore.create(this.userFirestore, user?.uid)
            this.database.create(this.userDatabase, user?.uid)
          })
        }
      })
    } else {
      this.firestore.create(this.userFirestore, user?.uid)
      this.database.create(this.userDatabase, user?.uid)
    }
  }

  sendEmailOnSignUp(user: firebase.User | null) {
    var sendEmailOnWebSignUp = firebase.functions().httpsCallable('sendEmailOnWebSignUp');
    sendEmailOnWebSignUp({ email: user?.email })
      .then((result) => {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log('Message',sanitizedMessage)
      }).catch((error)=>{
        console.log('error', error.message)
      })
  }

  gotoHome() {
    this.router.navigate(['home'])
  }

  openModal(template: TemplateRef<any>, cls: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm ' + cls, backdrop: 'static', keyboard: false });
  }

  closeModel() {
    this.modalRef.hide();
  }


}
