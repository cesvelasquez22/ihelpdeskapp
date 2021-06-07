import { Component, OnInit } from '@angular/core';
import { TitleHeader } from 'app/core/models/title-header.model';
import { TicketPriority, Ticket, TicketCategory, TicketState } from '../../models/ticket.interface';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  titleHeader: TitleHeader = {
    module: 'Tickets',
    overview: 'Listado',
    title: 'Tickets'
  }

  tickets: Ticket[] = [
    {
      uid: 'dasdasfdfsg',
      department: {
        uid: 'Q7COLwpIESPRVG59Katb',
        name: 'Desarrollo' 
      },
      subject: 'Avería',
      customer: 'Cesar Velasquez',
      priority: {
        uid: 'medium',
        name: 'Media',
        value: 2
      },
      category: TicketCategory.incidence,
      ticketState: TicketState.new
    },
    {
      uid: 'dasdsadgfdg',
      department: {
        uid: 'Q7COLwpIESPRVG59Katb',
        name: 'Desarrollo' 
      },
      subject: 'Avería',
      customer: 'Luis',
      priority: {
        uid: 'medium',
        name: 'Media',
        value: 2
      },
      category: TicketCategory.incidence,
      ticketState: TicketState.new,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeRoleStatus() {
    
  }

}
