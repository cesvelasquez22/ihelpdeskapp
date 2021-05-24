import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LandingRoutingModule } from './landing.routing';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { PricingComponent } from './components/pricing/pricing.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';


// Material



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PricingComponent,
  ],
  imports: [
    LandingRoutingModule,
    SharedModule,
    FuseNavigationModule,
    FuseCardModule,

    // Material
    MatIconModule,
    MatButtonModule,
  ]
})
export class LandingModule { }
