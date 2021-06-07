import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users.routing';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
<<<<<<< Updated upstream


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    RoleDetailComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  providers: [UsersService, RolesService],
=======
import { SharedModule } from 'app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UsersComponent,
        RolesComponent,
        RoleDetailComponent,
        UserDetailComponent,
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    providers: [UsersService, RolesService],
>>>>>>> Stashed changes
})
export class UsersModule {}
