import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getRecentGameAwards } from "./getRecentGameAwards";
import type { GetRecentGameAwardsResponse, RecentGameAwards } from "./models";

const server = setupServer();

describe("Function: getRecentGameAwards", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getRecentGameAwards).toBeDefined();
  });

  it("retrieves metadata about all recently-earned game awards on the site", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetRecentGameAwardsResponse = {
      Count: 1,
      Total: 1,
      Results: [
        {
          User: "renanbrj",
          AwardKind: "mastered",
          AwardDate: "2022-01-01T23:48:04+00:00",
          GameID: 14_284,
          GameTitle: "Batman Returns",
          ConsoleID: 15,
          ConsoleName: "Game Gear",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetRecentGameAwards.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getRecentGameAwards(authorization, {
      startDate: "2025-01-05",
      offset: 10,
      count: 10,
      desiredAwardKinds: ["completed"],
    });

    const expectedResponse: RecentGameAwards = {
      count: 1,
      total: 1,
      results: [
        {
          user: "renanbrj",
          awardKind: "mastered",
          awardDate: "2022-01-01T23:48:04+00:00",
          gameId: 14_284,
          gameTitle: "Batman Returns",
          consoleId: 15,
          consoleName: "Game Gear",
        },
      ],
    };

    // ASSERT
    expect(response).toEqual(expectedResponse);
  });
});
