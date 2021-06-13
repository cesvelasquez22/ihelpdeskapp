import { Component, Input, OnInit } from '@angular/core';
import { DepartmentStats } from '../department.stats';

@Component({
  selector: 'app-dept-card',
  templateUrl: './dept-card.component.html',
  styleUrls: ['./dept-card.component.scss']
})
export class DeptCardComponent implements OnInit {
  @Input() statistics: DepartmentStats;

  constructor() { }

  ngOnInit(): void {
  }

}
