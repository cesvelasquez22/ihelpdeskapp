import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Department } from '../../models/department.interface';
import { DepartmentsService } from '../../services/departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private departmentsService: DepartmentsService
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCustomers() {
    this.departmentsService.getAllDepartments().pipe(takeUntil(this.unsubscribe$)).subscribe(departments => {
      if (departments && departments.length > 0) {
        this.departments = departments;
      }
    })
  }

}
