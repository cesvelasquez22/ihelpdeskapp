import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import {BehaviorSubject, Observable, of} from 'rxjs';
import { map, shareReplay, switchMap, tap } from "rxjs/operators";
import { IUser, Roles } from "../user/user.model";
import { UserService } from "../user/user.service";

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    private currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(
        null
    );
    public user$ = this.currentUser.asObservable();
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private userService: UserService,
        private router: Router,
        private http: HttpClient,
    ) {
        this.user$ = this.getUser();
    }

    private getUser(): Observable<IUser> {
        return this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs
                        .doc<IUser>(`users/${user.uid}`)
                        .valueChanges()
                        .pipe(
                            tap((findedUser: IUser) =>
                                this.currentUser.next(findedUser)
                            )
                        );
                } else {
                    this.currentUser.next(null);
                    return of<IUser>(null);
                }
            }),
            shareReplay(1, 3000)
        );
    }

    isLoggedIn$() {
        return this.afAuth.authState.pipe(map((user) => !!user))
    }

    getCurrentUser() {
        return this.afAuth.currentUser;
    }

    checkAuthorization(user: IUser, allowedRoles: Roles[]): boolean {
        if (!user || user.role == null) {
            return false;
        }
        for (const role of allowedRoles) {
            if (user.role.name === role && user.active) {
                return true;
            }
        }
        return false;
    }
    canShow(allowedRoles: Roles[]): boolean {
        if (allowedRoles !== null && allowedRoles !== undefined) {
            const user: IUser = this.currentUser.value;
            return this.checkAuthorization(user, allowedRoles);
        } else {
            return true;
        }
    }

    signIn(credentials: { email: string, password: string }) {
        return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    signUp(newUser: IUser) {
        return this.http.post<IUser>(`${ environment.CF_URL }/users-createUser`, newUser);
    }

    async signOut(): Promise<void> {
        try {
            await this.afAuth.signOut();
            this.router.navigate(['/sign-out']);
        } catch (error) {}
    }
}
