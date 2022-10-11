import { camelizeArrayObjects } from "./camelizeArrayObjects";

describe("Util: camelizeArrayObjects", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(camelizeArrayObjects).toBeDefined();
  });

  it("given a list of PascalCase'd objects, camelizes each one and returns them in a new list", () => {
    // ARRANGE
    const originalArray = [
      { ID: 1, GameID: 1, AchievementIDs: [1, 2, 3, 4, 5] },
      { ID: 2, GameID: 2, AchievementIDs: [10, 11, 12, 13, 14] }
    ];

    // ACT
    const camelized = camelizeArrayObjects(originalArray);

    // ASSERT
    expect(camelized).toEqual([
      { id: 1, gameId: 1, achievementIds: [1, 2, 3, 4, 5] },
      { id: 2, gameId: 2, achievementIds: [10, 11, 12, 13, 14] }
    ]);
  });
});
