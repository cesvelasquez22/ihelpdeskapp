import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from 'app/core/auth/firebase.auth';
import { Roles } from 'app/core/user/user.model';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        const allowedRoles: Roles[] = [
            Roles.superAdmin,
            Roles.admin,
            Roles.customer,
        ];
        return this.firebaseAuthService.user$.pipe(
            tap(console.log),
            map((user) =>
                user && this.firebaseAuthService.checkAuthorization(user, allowedRoles)
            ),
            tap((hasAllowedRole) => {
                if (!hasAllowedRole) {
                    console.error('Access denied');
                    this.firebaseAuthService.signOut();
                }
            })
        );
    }
}
