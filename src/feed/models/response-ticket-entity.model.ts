export interface ResponseTicketEntity {
  ID: string;
  AchievementID: string;
  AchievementTitle: string;
  AchievementDesc: string;
  Points: string;
  BadgeName: string;
  AchievementAuthor: string;
  GameID: string;
  ConsoleName: string;
  GameTitle: string;
  GameIcon: string;
  ReportedAt: string;
  ReportType: string;
  ReportState: string;
  Hardcore: "0" | "1" | null;
  ReportNotes: string;
  ReportedBy: string;
  ResolvedAt: string | null;
  ResolvedBy: string | null;
  ReportStateDescription: string;
  ReportTypeDescription: string;

  URL?: string;
}
