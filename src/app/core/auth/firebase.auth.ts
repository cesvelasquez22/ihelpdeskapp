import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { IUser } from "../user/user.model";
import { UserService } from "../user/user.service";

@Injectable()
export class FirebaseAuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private userService: UserService,
    ) {}

    isLoggedIn$() {
        return this.afAuth.authState.pipe(map((user) => !!user))
    }

    signIn(credentials: { email: string, password: string }) {
        return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    async signUp(newUser: IUser) {
        try {
            const newUserCredential = await this.afAuth.createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            );
            await this.userService.setUserData(newUserCredential.user, newUser);
            return newUserCredential;
        } catch (error) {
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            await this.afAuth.signOut();
        } catch (error) {}
    }
}