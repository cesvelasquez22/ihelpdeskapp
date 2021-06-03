import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancesRoutingModule } from './maintenances.routing';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentsService } from './services/departments.service';


@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentDetailComponent,
  ],
  imports: [
    CommonModule,
    MaintenancesRoutingModule
  ],
  providers: [DepartmentsService],
})
export class MaintenancesModule { }
