import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets.routing';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { TicketsService } from './services/tickets.service';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ],
  providers: [TicketsService],
})
export class TicketsModule { }
