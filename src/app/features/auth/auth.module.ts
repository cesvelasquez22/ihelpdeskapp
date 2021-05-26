import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SharedModule } from 'app/shared/shared.module';


// Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { ConfirmationRequiredComponent } from './components/confirmation-required/confirmation-required.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    SignOutComponent,
    ConfirmationRequiredComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,

    // Fuse
    FuseAlertModule,
    FuseCardModule,

    // Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ]
})
export class AuthModule { }
