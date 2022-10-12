import { rest } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl, camelCaseKeys } from "../utils/internal";
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

  it("retrieves metadata about the current achievement of the week", async () => {
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
    expect(response).toEqual(camelCaseKeys(mockResponse));
  });
});
