import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FirestorageService } from '../firestorageService/firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserFirestorageService extends FirestorageService {
  
  protected basePath: string = 'UserEntries';

  constructor(protected storage: AngularFireStorage) {
    super(storage);
  }
}
