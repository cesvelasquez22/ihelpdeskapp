import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users.routing';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';


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
})
export class UsersModule { }
