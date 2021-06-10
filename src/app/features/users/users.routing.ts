import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RolesComponent } from './components/roles/roles.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  // USERS
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: UserDetailComponent },
  { path: 'users/:id', component: UserDetailComponent },

  // ROLES
  { path: 'roles', component: RolesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
