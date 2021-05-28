import { Route } from '@angular/router';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';

// Angular Fire Auth Guard
import { AngularFireAuthGuard, canActivate } from '@angular/fire/auth-guard';

import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { redirectUnauthorizedToHome } from './core/auth/angular-fire.pipes';
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
        // children: [
        //     {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
        //     {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
        //     {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
        //     {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
        //     {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        // ]
    },

    // Auth routes for authenticated users
    // {
    //     path: '',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     component: LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children: [
    //         {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
    //         {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
    //     ]
    // },

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
