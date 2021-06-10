import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
  // DEPARTMENTS
  { path: 'departments', component: DepartmentsComponent },

  // CATEGORIES
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancesRoutingModule { }
