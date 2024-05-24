import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getAchievementCount } from "./getAchievementCount";
import type { GetAchievementCountResponse } from "./models";

const server = setupServer();

describe("Function: getAchievementCount", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAchievementCount).toBeDefined();
  });

  it("given a game ID, retrieves the list of achievement IDs associated with the game and cleans properties", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetAchievementCountResponse = {
      GameID: 8,
      AchievementIDs: [1, 2, 3, 4, 5],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementCount.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getAchievementCount(authorization, { gameId: 8 });

    // ASSERT
    expect(response).toEqual({
      gameId: 8,
      achievementIds: [1, 2, 3, 4, 5],
    });
  });
});
