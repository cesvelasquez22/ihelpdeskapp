import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancesRoutingModule } from './maintenances.routing';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentsService } from './services/departments.service';
import { SharedModule } from 'app/shared/shared.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoriesService } from './services/categories.service';

@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentDetailComponent,
    CategoriesComponent,
    CategoryDetailComponent,
  ],
  imports: [
    CommonModule,
    MaintenancesRoutingModule,
    SharedModule,

    // Material
    MatIconModule,
    MatButtonModule,
  ],
  providers: [CategoriesService],
})
export class MaintenancesModule { }
