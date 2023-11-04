import type { AwardType } from "./award-type.model";

interface UserAward {
  awardedAt: string;
  awardType: AwardType;
  awardData: number;
  awardDataExtra: number;
  displayOrder: number;
  title: string;
  consoleName: string;
  flags: number | null;
  imageIcon: string;
}

export interface UserAwards {
  totalAwardsCount: number;
  hiddenAwardsCount: number;
  masteryAwardsCount: number;
  completionAwardsCount: number;
  beatenHardcoreAwardsCount: number;
  beatenSoftcoreAwardsCount: number;
  eventAwardsCount: number;
  siteAwardsCount: number;
  visibleUserAwards: UserAward[];
}
