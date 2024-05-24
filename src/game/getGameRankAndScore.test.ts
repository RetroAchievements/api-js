/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameRankAndScore } from "./getGameRankAndScore";
import type { GetGameRankAndScoreResponse } from "./models";

const server = setupServer();

describe("Function: getGameRankAndScore", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameRankAndScore).toBeDefined();
  });

  it("given a game ID, retrieves metadata about latest masteries for a game", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameRankAndScoreResponse = [
      {
        User: "Arekdias",
        TotalScore: "189",
        LastAward: "2020-10-10 22:43:32",
        Rank: 1,
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameRankAndScore.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGameRankAndScore(authorization, {
      gameId: 14_402,
      type: "high-scores",
    });

    // ASSERT
    expect(response).toEqual([
      {
        user: "Arekdias",
        totalScore: 189,
        lastAward: "2020-10-10 22:43:32",
        rank: 1,
      },
    ]);
  });
});
