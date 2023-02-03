import type { TicketEntity } from "./ticket-entity.model";

export interface RecentTickets {
  recentTickets: TicketEntity[];
  openTickets: number;
  url: string;
}
