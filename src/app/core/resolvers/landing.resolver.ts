import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { landingNavigation } from 'app/features/landing/landing.navigation';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LandingResolver implements Resolve<any> {
    resolve(
        route: ActivatedRouteSnapshot
    ):
        | Observable<any>
        | Promise<any>
        | any {
        return of(landingNavigation).pipe(
            map((navigation) => ({
                navigation: {
                    horizontal: navigation,
                },
            }))
        );
    }
}
