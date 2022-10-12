export type CommonCallOptions = Partial<{
  /**
   * Enabled by default. The RetroAchievements.org API returns PascalCase'd
   * responses that often contain only string-typed values. When this option
   * is enabled, a mapping function is executed to convert keys to be
   * camelCased and cast strings to numbers and/or dates.
   */
  isPropertyCleaningEnabled: boolean;
}>;
