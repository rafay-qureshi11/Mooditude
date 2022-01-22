import { Inject, Injectable } from '@angular/core';
import { DatabaseService } from "../databaseService/database.service"
import { user } from "src/app/models/User"
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserDataBaseService extends DatabaseService<user>{

  protected fireListRef: AngularFireList<user>;
  protected fireObjRef: AngularFireObject<user>;
  basePath = "users";

  constructor(protected realtimeDB: AngularFireDatabase) {
    super(realtimeDB);
  }
}
