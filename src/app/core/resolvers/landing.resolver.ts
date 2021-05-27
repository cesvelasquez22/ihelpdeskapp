import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LandingResolver implements Resolve<any> {
    constructor(private http: HttpClient) { }
    resolve(
        route: ActivatedRouteSnapshot
    ):
        | Observable<any>
        | Promise<any>
        | any {
        return this.http.get<any>('api/landing/navigation').pipe(
            map((navigation) => ({
                navigation: {
                    default: navigation.default,
                    horizontal: navigation.horizontal,
                },
                auth: true,
            }))
        )
    }
}
