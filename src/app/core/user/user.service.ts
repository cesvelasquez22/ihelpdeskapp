import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Roles } from 'app/core/user/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private afs: AngularFirestore, private afAuth: AngularFireAuth,) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                // Execute the observable
                this._user.next(response);
            })
        );
    }

    async setUserData(credential, user) {
        const userRef = await this.afs.collection('users').doc(credential.uid);
        const userData = {
            uid: credential.uid,
            email: credential.email,
            displayName: user.displayName,
            role: Roles.customer,
            active: true,
        };
        return userRef.set(userData);
    }
}
