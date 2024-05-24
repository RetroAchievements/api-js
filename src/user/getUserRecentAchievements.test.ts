import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserRecentAchievements } from "./getUserRecentAchievements";
import type { GetUserRecentAchievementsResponse } from "./models";

const server = setupServer();

describe("Function: getUserRecentAchievements", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserRecentAchievements).toBeDefined();
  });

  it("retrieves a list of recently-earned user achievements", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserRecentAchievementsResponse = [
      {
        Date: "2023-05-23 22:32:24",
        HardcoreMode: 1,
        AchievementID: 51_214,
        Title: "You're a special Champ!",
        Description:
          "Win the Tournament as [You] on Hard with 1 attribute on max. and 1 attribute on min.",
        BadgeName: "121991",
        Points: 25,
        Author: "Som1",
        GameTitle: "WWF King of the Ring",
        GameIcon: "/Images/062599.png",
        GameID: 6316,
        ConsoleName: "Game Boy",
        BadgeURL: "/Badge/121991.png",
        GameURL: "/game/6316",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserRecentAchievements.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserRecentAchievements(authorization, {
      username: "xelnia",
    });

    // ASSERT
    expect(response).toEqual([
      {
        date: "2023-05-23 22:32:24",
        hardcoreMode: true,
        achievementId: 51_214,
        title: "You're a special Champ!",
        description:
          "Win the Tournament as [You] on Hard with 1 attribute on max. and 1 attribute on min.",
        badgeName: "121991",
        points: 25,
        author: "Som1",
        gameTitle: "WWF King of the Ring",
        gameIcon: "/Images/062599.png",
        gameId: 6316,
        consoleName: "Game Boy",
        badgeUrl: "/Badge/121991.png",
        gameUrl: "/game/6316",
      },
    ]);
  });
});
