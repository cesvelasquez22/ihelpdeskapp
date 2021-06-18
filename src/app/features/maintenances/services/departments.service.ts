import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Department } from '../models/department.interface';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departmentSubject = new BehaviorSubject<Department>(null);
  public department$ = this.departmentSubject.asObservable();
  
  constructor(
    private afs: AngularFirestore,
  ) { }

  set department(department: Department) {
    this.departmentSubject.next(department);
}

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

  createDepartmet(department: Department) {
    const docId = this.afs.createId();
    const timestampDate = firebase.firestore.Timestamp.fromDate(department.createdAt as any);
    return this.afs.collection('departments').doc(docId).set({
        uid: docId,
        name: department.name,
        createdAt: timestampDate,
        active: department.active,
    });
}

updateDepartment(department: Department) {
  const departmentDocRef = this.afs.collection('departments').doc(department.uid);
  return departmentDocRef.update({
      name: department.name,
      active: department.active,
  });
}

deleteDepartment(uid: string) {
  const departmentDocRef = this.afs.collection('departments').doc(uid);
  return departmentDocRef.delete();
}

}
