import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.interface';
import firebase from 'firebase/app';

@Injectable()
export class RolesService {

  constructor(
    private afs: AngularFirestore,
  ) { }


  getAllRoles() {
    return this.afs.collection('roles').snapshotChanges().pipe(
      map((snapshot) => {
        return snapshot.map((action) => {
          const data = action.payload.doc.data() as Role;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    )
  }

  getRoleByUid(uid: string) {
    return this.afs.collection('roles').doc(uid).valueChanges().pipe(map((role: any) => role as Role));
  }


}
