import { Injectable } from '@angular/core';
import { FirestoreService } from "../firestoreService/firestore.service"
import { Signup } from "src/app/models/signup-with-name-email"
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SignupWithNameEmailService extends FirestoreService<Signup> {
  protected basePath: string = 'SignupWithNameEmail';

  constructor(protected firestore: AngularFirestore) {
    super(firestore);
  }
}
