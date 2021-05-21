import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LandingRoutingModule } from './landing.routing';
import { LandingComponent } from './landing.component';
import { FuseNavigationModule } from '@fuse/components/navigation';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FuseNavigationModule,
  ]
})
export class LandingModule { }
