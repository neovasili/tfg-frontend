import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ticket } from '../../model/ticket';
import { TicketService } from '../../service/ticket/ticket.service';
import { Observable, Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';

@Component( {
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: [ './ticket-manager.component.css' ]
} )
export class TicketManagerComponent implements OnInit, OnDestroy {

  public tickets: Ticket[];
  private receivedTicket: Ticket;
  private subscribed: boolean;
  private subscription: Subscription;
  public messages: Observable<Message>;

  constructor( private ticketService: TicketService,
               private stompService: StompService ) {
  }

  ngOnInit() {

    this.subscribed = false;
    this.getTickets();
    this.subscribe();
  }

  getTickets(): void {

    this.ticketService.getTickets()
      .subscribe( tickets => this.tickets = tickets.ticketList );
  }

  public subscribe() {

    if ( this.subscribed ) {
      return;
    }

    this.messages = this.stompService.subscribe( '/response/ticket' );
    this.subscription = this.messages.subscribe( this.nextMessage );

    this.stompService.publish( '/request/ack',
      'connected!' );

    this.subscribed = true;
  }

  public unsubscribe() {

    if ( !this.subscribed ) {
      return;
    }

    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;

    this.subscribed = false;
  }

  nextMessage = ( message: Message ) => {

    this.receivedTicket = JSON.parse( message.body );

    if ( this.tickets != undefined ) {
      this.tickets.push( this.receivedTicket );
    }
  };

  ngOnDestroy() {
    this.unsubscribe();
  }
}
