import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

// Material
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { DeptCardComponent } from './dept-card/dept-card.component'

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    DeptCardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),

    // Material
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class DashboardModule { }
