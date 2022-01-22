import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth"
import { Router } from '@angular/router';
import firebase from 'firebase';
type authUser = {
  displayName: string;
  email: string;
  photoUrl: string;
  emailVerified: boolean;
  uid: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: authUser;
  isLoggedIn: boolean = false

  constructor(private fireAuth: AngularFireAuth,
    private router: Router) {
    this.onAuthStateChangedSubcription()
  }

  public get user(): authUser {
    return this._user;
  }
  public set user(value: authUser) {
    this._user = value;
  }

  onAuthStateChangedSubcription() {
    this.fireAuth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // user is signed in
        this.isLoggedIn = true
        this.user = {
          displayName: currentUser.displayName!,
          email: currentUser.email!,
          photoUrl: currentUser.photoURL!,
          emailVerified: currentUser.emailVerified,
          uid: currentUser.uid,
        }
        localStorage.setItem('currentUser', JSON.parse(JSON.stringify(this.user)))
        localStorage.setItem("displayName", this.user.displayName)
        localStorage.setItem("email", this.user.email)
        localStorage.setItem("photoUrl", this.user.photoUrl)
      } else {
        // No user is signed in.
        this.isLoggedIn = false
        localStorage.removeItem('currentUser')
        localStorage.removeItem("displayName")
        localStorage.removeItem("email")
        localStorage.removeItem("photoUrl")
      }
    });
  }

  SignIn(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        this.router.navigate(['home'])
        console.log('You are Successfully logged in!');
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  SignUp(email: string, password: string) {
    /* Response in return
        email:
        expiresIn:
        idToken: 
        kind: 
        localId:
        refreshToken:
     */
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  SignOut() {
    this.fireAuth.signOut()
      .then(res => {
        this.isLoggedIn = false
      })
  }

  ForgotPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email)
  }

  updateUserProfile(user: firebase.User | null, displayName: string, photoURL: string) {
    return user!.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    }).then(() => {
      this.user.displayName = displayName
      this.user.photoUrl = photoURL
      localStorage.setItem("displayName", displayName)
      localStorage.setItem("photoUrl", photoURL)
      localStorage.setItem('currentUser', JSON.parse(JSON.stringify(this.user)))
    }).catch(function () {
      // An error happened.
    });
  }
}
