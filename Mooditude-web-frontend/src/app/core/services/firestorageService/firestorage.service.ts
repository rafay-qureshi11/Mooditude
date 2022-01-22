import { Inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class FirestorageService {

  uploadPercent: Observable<number | undefined>;
  downloadURL: Observable<string>;
  protected abstract basePath: string;

  constructor(@Inject(AngularFireStorage) protected storage: AngularFireStorage) { }
  
  uploadFile(event: Event, key?:string) {
    const uid = key ? key : Math.random().toString(36).substring(2);
    const fileName = Math.random().toString(36).substring(2)
    const file =(<HTMLInputElement>event.target).files![0];
    const filePath = this.basePath + '/' + uid + '/' + fileName;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
}
