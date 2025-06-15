/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getLeaderboardEntries } from "./getLeaderboardEntries";
import type { GetLeaderboardEntriesResponse } from "./models";

const server = setupServer();

describe("Function: getLeaderboardEntries", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getLeaderboardEntries).toBeDefined();
  });

  it("given a leaderboard ID, retrieves the entries in that leaderboard", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetLeaderboardEntriesResponse = {
      Count: 100,
      Total: 1287,
      Results: [
        {
          Rank: 1,
          User: "vani11a",
          ULID: "00003EMFWR7XB8SDPEHB3K56ZQ",
          Score: 390_490,
          FormattedScore: "390,490",
          DateSubmitted: "2024-07-25T15:51:00+00:00",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetLeaderboardEntries.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getLeaderboardEntries(authorization, {
      leaderboardId: 104_370,
    });

    // ASSERT
    expect(response).toEqual({
      count: 100,
      total: 1287,
      results: [
        {
          rank: 1,
          user: "vani11a",
          ulid: "00003EMFWR7XB8SDPEHB3K56ZQ",
          score: 390_490,
          formattedScore: "390,490",
          dateSubmitted: "2024-07-25T15:51:00+00:00",
        },
      ],
    });
  });
});
