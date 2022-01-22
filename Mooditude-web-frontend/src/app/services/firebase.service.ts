import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth"
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from "@angular/fire/storage"
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private userID: string = ''
  downloadUrl: string = ''


  constructor(private _fireStore: AngularFirestore,
    private db: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    private _fireStorage: AngularFireStorage) { }

  createAuthUser(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  uploadImage(userId: string, photo: any) {
    return this._fireStorage.upload("/UserEntries/" + userId + '/' + Math.random(), photo)
  }

  userStoreData(userID: string, data: any) {
    return this._fireStore.collection('Users').doc(userID).set(data)
  }

  userDataBaseData(userId: any, data: any) {
    return this.db.database.ref('users/' + userId).set(data)
  }

  getCurrentUser() {
    return this.fireAuth.currentUser
  }

  updateUserProfile(user: any, displayName: string, photoURL: string) {
    return user.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    }).then(function () {
      // Update successful.
    }).catch(function () {
      // An error happened.
    });
  }


  getUsers() {
    return new Promise<any>((resolve, reject) => {
      this._fireStore.collection('/Users').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
    })
  }

  getUserById(_id: string | undefined) {
    this._fireStore.collection('users').doc(_id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log(doc.data());
      } else {
        console.log("There is no document!");
      }
    }).catch(function (error) {
      console.log("There was an error getting your document:", error);
    })
  }
}
