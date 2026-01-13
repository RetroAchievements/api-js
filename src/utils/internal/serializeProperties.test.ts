/* eslint-disable sonarjs/no-duplicate-string */

import { serializeProperties } from "./serializeProperties";

describe("Util: serializeProperties", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(serializeProperties).toBeDefined();
  });

  it("can serialize a simple object", () => {
    // ARRANGE
    const originalObject = {
      ID: 1,
      GameID: 100,
      AchievementIDs: [1, 2, 3, 4, 5],
      RAPoints: 100,
      ConsoleName: "PlayStation Portable",
    };

    // ACT
    const sanitizedObject = serializeProperties(originalObject);

    // ASSERT
    expect(sanitizedObject).toEqual({
      id: 1,
      gameId: 100,
      achievementIds: [1, 2, 3, 4, 5],
      raPoints: 100,
      consoleName: "PlayStation Portable",
    });
  });

  it("can serialize an array of objects", () => {
    // ARRANGE
    const originalArray = [
      {
        ID: 1,
        GameID: 100,
        AchievementIDs: [1, 2, 3, 4, 5],
        RAPoints: 100,
        ConsoleName: "PlayStation Portable",
      },
    ];

    // ACT
    const sanitizedArray = serializeProperties(originalArray);

    // ASSERT
    expect(sanitizedArray).toEqual([
      {
        id: 1,
        gameId: 100,
        achievementIds: [1, 2, 3, 4, 5],
        raPoints: 100,
        consoleName: "PlayStation Portable",
      },
    ]);
  });

  it("can serialize an object that contains nested objects", () => {
    // ARRANGE
    const originalObject = {
      ID: 1,
      GameID: 100,
      AchievementIDs: [1, 2, 3, 4, 5],
      RAPoints: 100,
      ConsoleName: "PlayStation Portable",
      UserMeta: {
        Name: "xelnia",
        Points: 100,
      },
    };

    // ACT
    const sanitizedObject = serializeProperties(originalObject);

    // ASSERT
    expect(sanitizedObject).toEqual({
      id: 1,
      gameId: 100,
      achievementIds: [1, 2, 3, 4, 5],
      raPoints: 100,
      consoleName: "PlayStation Portable",
      userMeta: {
        name: "xelnia",
        points: 100,
      },
    });
  });

  it("can be instructed to cast values of certain keys to numbers", () => {
    // ARRANGE
    const originalObject = {
      UserName: "xelnia",
      Points: "500",
      Metadata: {
        TitleID: "100",
      },
    };

    // ACT
    const sanitizedObject = serializeProperties(originalObject, {
      shouldCastToNumbers: ["TitleID", "Points"],
    });

    // ASSERT
    expect(sanitizedObject).toEqual({
      userName: "xelnia",
      points: 500,
      metadata: {
        titleId: 100,
      },
    });
  });

  it.each([
    { hardcoreMode: "0", isCoolGuy: "1" },
    { hardcoreMode: false, isCoolGuy: true },
  ])(
    "can be instructed to map values of certain keys to booleans such as the value '$hardcoreMode' and '$isCoolGuy'",
    ({ hardcoreMode, isCoolGuy }) => {
      // ARRANGE
      const originalObject = {
        UserName: "xelnia",
        HardcoreMode: hardcoreMode,
        Metadata: {
          IsCoolGuy: isCoolGuy,
        },
      };

      // ACT
      const sanitizedObject = serializeProperties(originalObject, {
        shouldMapToBooleans: ["HardcoreMode", "IsCoolGuy"],
      });

      // ASSERT
      expect(sanitizedObject).toEqual({
        userName: "xelnia",
        hardcoreMode: false,
        metadata: {
          isCoolGuy: true,
        },
      });
    }
  );
});
