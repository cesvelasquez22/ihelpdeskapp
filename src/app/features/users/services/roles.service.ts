import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.interface';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RolesService {
    private roleSubject = new BehaviorSubject<Role>(null);
    public role$ = this.roleSubject.asObservable();

    constructor(private afs: AngularFirestore) {}

    set role(role: Role) {
        this.roleSubject.next(role);
    }

    getAllRoles() {
        return this.afs
            .collection('roles')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as Role;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    getRoleByUid(uid: string) {
        return this.afs
            .collection('roles')
            .doc(uid)
            .valueChanges()
            .pipe(map((role: any) => role as Role));
    }

    createRole(role: Role) {
        const docId = this.afs.createId();
        const timestampDate = firebase.firestore.Timestamp.fromDate(role.createdAt as any);
        return this.afs.collection('roles').doc(docId).set({
            uid: docId,
            name: role.name,
            createdAt: timestampDate,
            active: role.active,
        });
    }

    updateRole(role: Role) {
        const roleDocRef = this.afs.collection('roles').doc(role.uid);
        return roleDocRef.update({
            name: role.name,
            active: role.active,
        });
    }

    deleteRole(uid: string) {
      const customerDocRef = this.afs.collection('roles').doc(uid);
      return customerDocRef.delete();
    }
}
