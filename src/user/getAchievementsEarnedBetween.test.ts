import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getAchievementsEarnedBetween } from "./getAchievementsEarnedBetween";
import type {
  DatedUserAchievement,
  DatedUserAchievementsResponse,
} from "./models";

const server = setupServer();

describe("Function: getAchievementsEarnedBetween", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAchievementsEarnedBetween).toBeDefined();
  });

  it("retrieves a list of user achievements earned between a set of dates", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: DatedUserAchievementsResponse = [
      {
        Date: "2022-10-12 07:36:31",
        HardcoreMode: "1",
        AchievementID: "173356",
        Title: "Wind Beneath My Wings",
        Description: "Collect all objects in the Wings Category.",
        BadgeName: "193797",
        Points: "10",
        Author: "blendedsea",
        GameTitle: "Me & My Katamari",
        GameIcon: "/Images/047357.png",
        GameID: "3571",
        ConsoleName: "PlayStation Portable",
        CumulScore: 40,
        BadgeURL: "/Badge/193797.png",
        GameURL: "/game/3571",
        Type: "progression",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementsEarnedBetween.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getAchievementsEarnedBetween(authorization, {
      username: "xelnia",
      fromDate: new Date("2022-10-12"),
      toDate: new Date("2022-10-13"),
    });

    const expectedResponse: DatedUserAchievement[] = [
      {
        date: "2022-10-12 07:36:31",
        hardcoreMode: true,
        achievementId: 173_356,
        title: "Wind Beneath My Wings",
        description: "Collect all objects in the Wings Category.",
        badgeName: "193797",
        points: 10,
        author: "blendedsea",
        gameTitle: "Me & My Katamari",
        gameIcon: "/Images/047357.png",
        gameId: 3571,
        consoleName: "PlayStation Portable",
        cumulScore: 40,
        badgeUrl: "/Badge/193797.png",
        gameUrl: "/game/3571",
        type: "progression",
      },
    ];

    // ASSERT
    expect(response).toEqual(expectedResponse);
  });
});
