import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseAuthService } from '../firebase.auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private router: Router,
  ) { }

  private checkAuth(redirectURL: string): Observable<boolean> {
    // Check the authentication status
    return this.firebaseAuthService.isLoggedIn$()
      .pipe(
        switchMap((authenticated) => {

          // If the user is not authenticated...
          if (!authenticated) {
            // Redirect to the sign-in page
            this.router.navigate(['sign-in'], { queryParams: { redirectURL } });

            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this.checkAuth(redirectUrl);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    return this.checkAuth(redirectUrl);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth('/');
  }

}
