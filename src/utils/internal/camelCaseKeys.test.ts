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
      gameId: 14_402,
      achievementIds: [1, 2, 3, 4, 5],
      someKey: "someValue",
      someNestedObject: {
        anotherKey: "anotherValue"
      }
    });
  });
});
