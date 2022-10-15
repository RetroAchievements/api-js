interface AchievementUnlocksResponseEntity {
  User: string;
  RAPoints: string;
  DateAwarded: string;
  HardcoreMode: string;
}

export type GetAchievementUnlocksResponse = AchievementUnlocksResponseEntity[];
