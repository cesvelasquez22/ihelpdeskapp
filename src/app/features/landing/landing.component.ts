import { Component, OnInit } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { landingNavigation } from './landing.navigation';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  navigation: FuseNavigationItem[] = landingNavigation;

  constructor() { }

  ngOnInit(): void {
  }

}
