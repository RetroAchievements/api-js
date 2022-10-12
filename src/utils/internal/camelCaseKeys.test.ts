import { camelCaseKeys } from "./camelCaseKeys";

describe("Util: camelCaseKeys", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(camelCaseKeys).toBeDefined();
  });

  it("converts object keys to camel case", () => {
    // ARRANGE
    const sampleObject = {
      ID: 1,
      GameID: 14_402,
      AchievementIDs: [1, 2, 3, 4, 5],
      SomeKey: "someValue",
      SomeNestedObject: {
        AnotherKey: "anotherValue"
      }
    };

    // ACT
    const sanitizedObject = camelCaseKeys(sampleObject);

    // ASSERT
    expect(sanitizedObject).toEqual({
      id: 1,
      gameID: 14_402,
      achievementIDs: [1, 2, 3, 4, 5],
      someKey: "someValue",
      someNestedObject: {
        anotherKey: "anotherValue"
      }
    });
  });

  it("given a list of PascalCase'd objects, camelizes each one and returns them in a new list", () => {
    // ARRANGE
    const originalArray = [
      { ID: 1, GameID: 1, AchievementIDs: [1, 2, 3, 4, 5] },
      { ID: 2, GameID: 2, AchievementIDs: [10, 11, 12, 13, 14] }
    ];

    // ACT
    const camelized = camelCaseKeys(originalArray);

    // ASSERT
    expect(camelized).toEqual([
      { id: 1, gameID: 1, achievementIDs: [1, 2, 3, 4, 5] },
      { id: 2, gameID: 2, achievementIDs: [10, 11, 12, 13, 14] }
    ]);
  });
});
