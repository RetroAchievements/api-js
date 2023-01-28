import type { TicketEntity } from "./ticket-entity.model";

export interface GameTicketStats {
  gameId: number;
  gameTitle: string;
  consoleName: string;
  openTickets: number;
  url: string;

  tickets?: TicketEntity[];
}
