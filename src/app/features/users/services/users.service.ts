import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable()
export class UsersService {
    constructor(private afs: AngularFirestore, private http: HttpClient) {}

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
        return this.http.put<User>(
            `${environment.CF_URL}/users-updateUser`,
            user
        );
    }
}
