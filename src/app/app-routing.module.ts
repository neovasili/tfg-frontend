import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CreateTicketComponent } from './component/create-ticket/create-ticket.component';
import { TicketManagerComponent } from './component/ticket-manager/ticket-manager.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-ticket', component: CreateTicketComponent },
  { path: 'tickets-manager', component: TicketManagerComponent }
];

@NgModule( {
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
} )
export class AppRoutingModule {
}
