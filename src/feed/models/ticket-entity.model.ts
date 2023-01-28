export interface TicketEntity {
  id: number;
  achievementId: number;
  achievementTitle: string;
  achievementDesc: string;
  points: number;
  badgeName: string;
  achievementAuthor: string;
  gameId: number;
  consoleName: string;
  gameTitle: string;
  gameIcon: string;
  reportedAt: string;
  reportType: number;
  reportState: number;
  hardcore: boolean | null;
  reportNotes: string;
  reportedBy: string;
  resolvedAt: string | null;
  resolvedBy: string | null;
  reportStateDescription: string;
  reportTypeDescription: string;
  url: string;
}
