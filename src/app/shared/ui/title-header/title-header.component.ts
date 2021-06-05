import { Component, Input, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';
@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent implements OnInit {
  @Input() titleHeader: TitleHeader;

  constructor() { }

  ngOnInit(): void {
  }

}
