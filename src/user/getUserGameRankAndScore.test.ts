import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserGameRankAndScore } from "./getUserGameRankAndScore";
import type { GetUserGameRankAndScoreResponse } from "./models";

const server = setupServer();

describe("Function: getUserGameRankAndScore", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserGameRankAndScore).toBeDefined();
  });

  it("given a game ID and a user name, retrieves metadata about how that user ranks on the given game", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserGameRankAndScoreResponse = [
      {
        User: "xelnia",
        TotalScore: "1000",
        LastAward: "2022-09-01 21:51:23",
        UserRank: "4",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserGameRankAndScore.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserGameRankAndScore(authorization, {
      username: "xelnia",
      gameId: 14_402,
    });

    // ASSERT
    expect(response).toEqual([
      {
        user: "xelnia",
        totalScore: 1000,
        lastAward: "2022-09-01 21:51:23",
        userRank: 4,
      },
    ]);
  });
});
