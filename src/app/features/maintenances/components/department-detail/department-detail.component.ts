import { Component, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})

export class DepartmentDetailComponent implements OnInit {
  titleHeader: TitleHeader = {
    module: 'Mantenimientos',
    overview : 'Detalle del departamento',
    title: 'Departamentos',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
