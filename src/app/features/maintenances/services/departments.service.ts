import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Department } from '../models/department.interface';
import firebase from 'firebase/app';

@Injectable()
export class DepartmentsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getAllDepartments() {
    return this.afs.collection('departments').snapshotChanges().pipe(
      map((snapshot) => {
        return snapshot.map((action) => {
          const data = action.payload.doc.data() as Department;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    )
  }

  getDepartmentByUid(uid: string) {
    return this.afs.collection('departments').doc(uid).valueChanges().pipe(map((department: any) => department as Department));
  }

}
