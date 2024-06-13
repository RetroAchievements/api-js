import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getAchievementUnlocks } from "./getAchievementUnlocks";
import type { GetAchievementUnlocksResponse } from "./models";

const server = setupServer();

describe("Function: getAchievementUnlocks", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAchievementUnlocks).toBeDefined();
  });

  it("retrieves metadata about unlocks for a target achievement", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetAchievementUnlocksResponse = {
      Achievement: {
        ID: "1",
        Title: "Ring Collector",
        Description: "Collect 100 Rings!",
        Points: "5",
        TrueRatio: "6",
        Author: "Scott",
        DateCreated: "2012-11-02 00:03:12",
        DateModified: "2022-06-11 16:52:35",
      },
      Console: { ID: "1", Title: "Mega Drive" },
      Game: { ID: "1", Title: "Sonic the Hedgehog" },
      UnlocksCount: 9524,
      TotalPlayers: 21_710,
      Unlocks: [
        {
          User: "Tiotroll2022",
          RAPoints: "348",
          RASoftcorePoints: "363",
          DateAwarded: "2023-01-29 21:45:41",
          HardcoreMode: "0",
        },
      ],
    };

    let requestUrl = "";

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementUnlocks.php`, (info) => {
        requestUrl = info.request.url;
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getAchievementUnlocks(authorization, {
      achievementId: 18_000,
      count: 1,
      offset: 1,
    });

    // ASSERT
    expect(requestUrl).toContain("a=18000");
    expect(requestUrl).toContain("o=1");
    expect(requestUrl).toContain("c=1");

    expect(response).toEqual({
      achievement: {
        id: 1,
        title: "Ring Collector",
        description: "Collect 100 Rings!",
        points: 5,
        trueRatio: 6,
        author: "Scott",
        dateCreated: "2012-11-02 00:03:12",
        dateModified: "2022-06-11 16:52:35",
      },
      console: { id: 1, title: "Mega Drive" },
      game: { id: 1, title: "Sonic the Hedgehog" },
      unlocksCount: 9524,
      totalPlayers: 21_710,
      unlocks: [
        {
          user: "Tiotroll2022",
          raPoints: 348,
          raSoftcorePoints: 363,
          dateAwarded: "2023-01-29 21:45:41",
          hardcoreMode: false,
        },
      ],
    });
  });
});
