import { Route } from '@angular/router';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';

import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { FirebaseAuthGuard } from './core/auth/guards/firebase-auth.guard';
import { LandingResolver } from './core/resolvers/landing.resolver';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboard'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed in user to the '/dashboard'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        // data: {
        //     layout: 'empty'
        // },
        resolve: {
            initialData: LandingResolver,
        },
        data: { showAuth: false },
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: LandingResolver,
        },
        data: { showAuth: true },
        children: [
            { path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [FirebaseAuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
        ]
    }
];
