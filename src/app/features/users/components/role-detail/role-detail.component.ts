import { Component, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {
  titleHeader: TitleHeader= {
    module: 'Seguridad',
    overview: 'Detalle de roles',
    title: 'Roles',
    back: true,
  };


  constructor() { }

  ngOnInit(): void {
  }

}
