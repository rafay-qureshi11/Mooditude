import { Inject } from "@angular/core";
import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

export abstract class FirestoreService<T> {

  protected abstract basePath: string;

  constructor(@Inject(AngularFirestore) protected firestore: AngularFirestore) {

  }

  doc$(id: string): Observable<T> {
    const obs = this.firestore.doc<T>(`${this.basePath}/${id}`).valueChanges() as Observable<T>;
    return obs.pipe(
      tap(r => {
        if (!environment.production) {
          console.groupCollapsed(`Firestore Streaming [${this.basePath}] [doc$] ${id}`)
          console.log(r)
          console.groupEnd()
        }
      }),
    );
  }

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(`${this.basePath}`, queryFn).valueChanges().pipe(
      tap(r => {
        if (!environment.production) {
          console.groupCollapsed(`Firestore Streaming [${this.basePath}] [collection$]`)
          console.table(r)
          console.groupEnd()
        }
      }),
    );
  }

  create(value: T, key?: string) {
    const uid = key ? key : this.firestore.createId();
    return this.collection.doc(uid).set(Object.assign({}, { uid }, value)).then(_ => {
      if (!environment.production) {
        console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
        console.log('[Id]', uid, value)
        console.groupEnd()
      }
    })
  }

  delete(id: string) {
    return this.collection.doc(id).delete().then(_ => {
      if (!environment.production) {
        console.groupCollapsed(`Firestore Service [${this.basePath}] [delete]`)
        console.log('[Id]', id)
        console.groupEnd()
      }
    })
  }

  private get collection() {
    return this.firestore.collection(`${this.basePath}`);
  }
}
