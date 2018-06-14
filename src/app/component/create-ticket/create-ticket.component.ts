import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticket/ticket.service';
import { Ticket } from '../../model/ticket';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  ticket: Ticket = new Ticket();

  constructor(
    private ticketService: TicketService ) {
  }

  ngOnInit() {
  }

  add( customerName: string, ticketAmount: string ): void {

    this.ticket.customerName = customerName;
    this.ticket.ticketAmount = ticketAmount;

    this.ticketService.saveTicket( this.ticket )
      .subscribe();
  }
}
