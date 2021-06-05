import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable()
export class UsersService {
    constructor(private afs: AngularFirestore) {}

    getAllUsers() {
        return this.afs
            .collection('users')
            .snapshotChanges()
            .pipe(
                map((snapshot) => {
                    return snapshot.map((action) => {
                        const data = action.payload.doc.data() as User;
                        data.uid = action.payload.doc.id;
                        return data;
                    });
                })
            );
    }

    getUserByUid(uid: string) {
        return this.afs
            .collection('users')
            .doc(uid)
            .valueChanges()
            .pipe(map((user: any) => user as User));
    }

    updateUser(user: User) {
        const userDocRef = this.afs.collection('users').doc(user.uid);
        return userDocRef.update(user);
    }
}
