import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/create', component: DepartmentDetailComponent },
  { path: 'departments/:id', component: DepartmentDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancesRoutingModule { }
