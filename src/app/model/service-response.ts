import { Ticket } from './ticket';

export class ServiceResponse {
  invocator: string;
  type: string;
  status: string;
  timestamp: {
    month: string;
    year: number;
    dayOfMonth: number;
    dayOfWeek: string;
    dayOfYear: number;
    monthValue: number;
    hour: number;
    minute: number;
    nano: number;
    second: number;
    chronology: {
      id: string;
      calendarType: string;
    }
  };
  ticket: Ticket;
  ticketList: Ticket[];
}
