interface ReportedGameEntity {
  GameID: string;
  GameTitle: string;
  GameIcon: string;
  Console: string;
  OpenTickets: string;
}

export interface MostTicketedGamesResponse {
  MostReportedGames: ReportedGameEntity[];
  URL: string;
}
