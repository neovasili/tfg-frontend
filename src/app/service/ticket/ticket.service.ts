import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Ticket } from '../../model/ticket';
import { ServiceResponse } from '../../model/service-response';

import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  } )
};

@Injectable( {
  providedIn: 'root'
} )
export class TicketService {

  private ticketsUrl = environment.ticketsUrl;

  constructor(
    private http: HttpClient ) {
  }

  getTickets(): Observable<ServiceResponse> {

    const getTicketsUrl = this.ticketsUrl + 'store/1';

    return this.http.get<ServiceResponse>( getTicketsUrl, httpOptions )
      .pipe(
        catchError( this.handleError( 'getTickets', null ) )
      );
  }

  saveTicket( ticket: Ticket ): Observable<Ticket> {

    const saveTicketUrl = this.ticketsUrl + 'ticket';

    return this.http.post<Ticket>( saveTicketUrl, ticket, httpOptions )
      .pipe(
        catchError( this.handleError<Ticket>( 'saveTicket' ) )
      );
  }

  private handleError<T>( operation = 'operation', result?: T ) {
    return ( error: any ): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error( error );

      // TODO: better job of transforming error for user consumption
      console.log( `${operation} failed: ${error.message}` );

      return of( result as T );
    };
  }
}
