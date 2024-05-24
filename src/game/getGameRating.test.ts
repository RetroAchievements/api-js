import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameRating } from "./getGameRating";
import type { GetGameRatingResponse } from "./models";

const server = setupServer();

describe("Function: getGameRating", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameRating).toBeDefined();
  });

  it("given a game ID, retrieves metadata about how users have rated it", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameRatingResponse = {
      GameID: 14_402,
      Ratings: {
        Game: 3.1875,
        Achievements: 0,
        GameNumVotes: 16,
        AchievementsNumVotes: 0,
      },
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameRating.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGameRating(authorization, { gameId: 14_402 });

    // ASSERT
    expect(response).toEqual({
      gameId: 14_402,
      ratings: {
        game: 3.1875,
        achievements: 0,
        gameNumVotes: 16,
        achievementsNumVotes: 0,
      },
    });
  });
});
