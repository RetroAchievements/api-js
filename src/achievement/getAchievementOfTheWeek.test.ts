/* eslint-disable sonarjs/no-duplicate-string */

import { rest } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getAchievementOfTheWeek } from "./getAchievementOfTheWeek";
import type { GetAchievementOfTheWeekResponse } from "./models";

const server = setupServer();

describe("Function: getAchievementOfTheWeek", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAchievementOfTheWeek).toBeDefined();
  });

  it("retrieves metadata about the current achievement of the week and cleans properties", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementOfTheWeekResponse = {
      Achievement: {
        ID: "165062",
        Title: "The True Hero",
        Description: "Receive any Ending as Han [Normal or Hard]",
        Points: "10",
        TrueRatio: "22",
        Author: "BigWeedSmokerMan",
        DateCreated: "2021-08-08 17:47:46",
        DateModified: "2021-08-09 12:20:05"
      },
      Console: { ID: "39", Title: "Saturn" },
      ForumTopic: { ID: "14767" },
      Game: { ID: "14513", Title: "Guardian Heroes" },
      StartAt: "2022-10-10 00:00:00",
      TotalPlayers: "219",
      Unlocks: [
        {
          User: "Tirbaba2",
          RAPoints: "72",
          DateAwarded: "2022-10-10 01:42:19",
          HardcoreMode: "1"
        }
      ],
      UnlocksCount: "40"
    };

    server.use(
      rest.get(`${apiBaseUrl}/API_GetAchievementOfTheWeek.php`, (_, res, ctx) =>
        res(ctx.json(mockResponse))
      )
    );

    // ACT
    const response = await getAchievementOfTheWeek(authorization);

    // ASSERT
    expect(response).toEqual({
      achievement: {
        id: 165_062,
        title: "The True Hero",
        description: "Receive any Ending as Han [Normal or Hard]",
        points: 10,
        trueRatio: 22,
        author: "BigWeedSmokerMan",
        dateCreated: "2021-08-08 17:47:46",
        dateModified: "2021-08-09 12:20:05"
      },
      console: { id: 39, title: "Saturn" },
      forumTopic: { id: 14_767 },
      game: { id: 14_513, title: "Guardian Heroes" },
      startAt: "2022-10-10 00:00:00",
      totalPlayers: 219,
      unlocks: [
        {
          user: "Tirbaba2",
          raPoints: 72,
          dateAwarded: "2022-10-10 01:42:19",
          hardcoreMode: true
        }
      ],
      unlocksCount: 40
    });
  });

  it("properly sets the hardcore boolean value when cleaning properties", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementOfTheWeekResponse = {
      Achievement: {
        ID: "165062",
        Title: "The True Hero",
        Description: "Receive any Ending as Han [Normal or Hard]",
        Points: "10",
        TrueRatio: "22",
        Author: "BigWeedSmokerMan",
        DateCreated: "2021-08-08 17:47:46",
        DateModified: "2021-08-09 12:20:05"
      },
      Console: { ID: "39", Title: "Saturn" },
      ForumTopic: { ID: "14767" },
      Game: { ID: "14513", Title: "Guardian Heroes" },
      StartAt: "2022-10-10 00:00:00",
      TotalPlayers: "219",
      Unlocks: [
        {
          User: "Tirbaba2",
          RAPoints: "72",
          DateAwarded: "2022-10-10 01:42:19",
          HardcoreMode: "0"
        }
      ],
      UnlocksCount: "40"
    };

    server.use(
      rest.get(`${apiBaseUrl}/API_GetAchievementOfTheWeek.php`, (_, res, ctx) =>
        res(ctx.json(mockResponse))
      )
    );

    // ACT
    const response = await getAchievementOfTheWeek(authorization);

    // ASSERT
    expect(response).toEqual({
      achievement: {
        id: 165_062,
        title: "The True Hero",
        description: "Receive any Ending as Han [Normal or Hard]",
        points: 10,
        trueRatio: 22,
        author: "BigWeedSmokerMan",
        dateCreated: "2021-08-08 17:47:46",
        dateModified: "2021-08-09 12:20:05"
      },
      console: { id: 39, title: "Saturn" },
      forumTopic: { id: 14_767 },
      game: { id: 14_513, title: "Guardian Heroes" },
      startAt: "2022-10-10 00:00:00",
      totalPlayers: 219,
      unlocks: [
        {
          user: "Tirbaba2",
          raPoints: 72,
          dateAwarded: "2022-10-10 01:42:19",
          hardcoreMode: false
        }
      ],
      unlocksCount: 40
    });
  });
});
