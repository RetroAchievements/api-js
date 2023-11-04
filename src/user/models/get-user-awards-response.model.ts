import type { AwardType } from "./award-type.model";

interface GetUserAwardsEntity {
  AwardedAt: string;
  AwardType: AwardType;
  AwardData: number;
  AwardDataExtra: number;
  DisplayOrder: number;
  Title: string;
  ConsoleName: string;
  Flags: number | null;
  ImageIcon: string;
}

export interface GetUserAwardsResponse {
  TotalAwardsCount: number;
  HiddenAwardsCount: number;
  MasteryAwardsCount: number;
  CompletionAwardsCount: number;
  BeatenHardcoreAwardsCount: number;
  BeatenSoftcoreAwardsCount: number;
  EventAwardsCount: number;
  SiteAwardsCount: number;
  VisibleUserAwards: GetUserAwardsEntity[];
}
