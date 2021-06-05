import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users.routing';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersService } from './services/users.service';
import { RolesService } from './services/roles.service';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    RoleDetailComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],
  providers: [UsersService, RolesService],
})
export class UsersModule { }
