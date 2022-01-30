import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from 'app/core//auth/firebase.auth';
import { Roles } from 'app/core/user/user.model';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(private firebaseAuthService: FirebaseAuthService, private router: Router, private _route: ActivatedRoute) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const routerRoles: Roles[] = route.data.roles;
        return this.firebaseAuthService.user$.pipe(
            map((user) =>
                user && this.firebaseAuthService.checkAuthorization(user, routerRoles)
            ),
            tap((hasAuthorization) => {
                if (!hasAuthorization) {
                    console.error('Access denied - No allowed role');
                    this.router.navigate([''], { relativeTo: this._route });
                }
            })
        );
    }
}
