import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from 'app/core//auth/firebase.auth';
import { Roles } from 'app/core/user/user.model';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const routerRoles: Roles[] = route.data.roles;
        return this.firebaseAuthService.user$.pipe(
            map((user) =>
                user && this.firebaseAuthService.checkAuthorization(user, routerRoles)
                    ? true
                    : false
            ),
            tap((hasAuthorization) => {
                if (!hasAuthorization) {
                    console.error('Access denied - No allowed role');
                    this.router.navigate(['apps']);
                }
            })
        );
    }
}
