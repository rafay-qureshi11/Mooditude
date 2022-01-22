import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from "@angular/fire/storage"
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  // ...
  imports: [
      // ...
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      ReactiveFormsModule,
      AngularFireStorageModule
  ],
  exports: [
      CommonModule,
      AngularFireModule,
      AngularFirestoreModule,
      ReactiveFormsModule,
      AngularFireStorageModule
  ]
})
export class CoreModule { }

