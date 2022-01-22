import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from "src/app/core/services/firestoreService/firestore.service"
import { MentalHealth } from "src/app/models/MentalHealth"
@Injectable({
  providedIn: 'root'
})
export class MentalHealthFirestoreService extends FirestoreService<MentalHealth> {

  protected basePath: string = 'MentalHealth';

  constructor(protected firestore: AngularFirestore) {
    super(firestore)
  }

}
