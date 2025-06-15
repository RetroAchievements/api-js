/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserGameLeaderboards } from "./getUserGameLeaderboards";
import type { GetUserGameLeaderboardsResponse } from "./models";

const server = setupServer();

describe("Function: getUserGameLeaderboards", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserGameLeaderboards).toBeDefined();
  });

  it("given a game ID, retrieves the users leaderboards", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserGameLeaderboardsResponse = {
      Count: 10,
      Total: 64,
      Results: [
        {
          ID: 19_062,
          RankAsc: true,
          Title: "New Zealand One",
          Description: "Complete New Zealand S1 in least time",
          Format: "MILLISECS",
          UserEntry: {
            User: "zuliman92",
            ULID: "00003EMFWR7XB8SDPEHB3K56ZQ",
            Score: 12_620,
            FormattedScore: "2:06.20",
            Rank: 2,
            DateUpdated: "2024-12-12T16:40:59+00:00",
          },
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserGameLeaderboards.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserGameLeaderboards(authorization, {
      gameId: 1,
      username: "zuliman92",
    });

    // ASSERT
    expect(response).toEqual({
      count: 10,
      total: 64,
      results: [
        {
          id: 19_062,
          rankAsc: true,
          title: "New Zealand One",
          description: "Complete New Zealand S1 in least time",
          format: "MILLISECS",
          userEntry: {
            user: "zuliman92",
            ulid: "00003EMFWR7XB8SDPEHB3K56ZQ",
            score: 12_620,
            formattedScore: "2:06.20",
            rank: 2,
            dateUpdated: "2024-12-12T16:40:59+00:00",
          },
        },
      ],
    });
  });
});
