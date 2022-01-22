import { Inject, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export abstract class DatabaseService<T>{

  protected abstract basePath: string;
  protected abstract fireListRef: AngularFireList<T>;
  protected abstract fireObjRef: AngularFireObject<T>;

  constructor(protected db: AngularFireDatabase,) { }

  getAll(): AngularFireList<T> {
    return this.db.list(this.basePath);
  }
  // Fetch Single Student Object
  getById(id: string) {
    return this.db.object(this.basePath + '/' + id);
  }

  create(value: T, key?: string) {
    const uid = key ? key : this.db.createPushId();
    return this.db.database.ref(this.basePath).child(uid).set(Object.assign({}, { uid }, value)).then(_ => {
      if (!environment.production) {
        console.groupCollapsed(`Realtime database Service [${this.basePath}] [create]`)
        console.log('[Id]', uid, value)
        console.groupEnd()
      }
    })
  }

  update(key: string, value: T): Promise<void> {
    return this.fireListRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.fireListRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.fireListRef.remove();
  }
}