import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateTicketComponent } from './component/create-ticket/create-ticket.component';
import { TicketManagerComponent } from './component/ticket-manager/ticket-manager.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import { StompConfig, StompService } from '@stomp/ng2-stompjs';

import { environment } from '../environments/environment';

const stompConfig: StompConfig = {

  url: environment.webSocketUrl,

  headers: {
    login: environment.webSocketLogin,
    passcode: environment.webSocketPass
  },

  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: environment.webSocketDebug
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateTicketComponent,
    TicketManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
