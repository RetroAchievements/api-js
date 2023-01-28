import type { ResponseTicketEntity } from "./response-ticket-entity.model";

export interface RecentTicketsResponse {
  RecentTickets: ResponseTicketEntity[];
  OpenTickets: number;
  URL: string;
}
