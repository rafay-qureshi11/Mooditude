import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from "src/app/models/User"
import { FirestoreService } from "../firestoreService/firestore.service"
@Injectable({
  providedIn: 'root'
})
export class UserFireStoreService extends FirestoreService<User>{

  protected basePath: string = 'Users';
  constructor(protected firestore: AngularFirestore) {
    super(firestore)
  }
}
