import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LandingRoutingModule } from './landing.routing';
import { FuseNavigationModule } from '@fuse/components/navigation';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FuseNavigationModule,
  ]
})
export class LandingModule { }
