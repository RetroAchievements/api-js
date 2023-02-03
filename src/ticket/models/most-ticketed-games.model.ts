export interface ReportedGameEntity {
  gameId: number;
  gameTitle: string;
  gameIcon: string;
  console: string;
  openTickets: number;
}

export interface MostTicketedGames {
  mostReportedGames: ReportedGameEntity[];
  url: string;
}
