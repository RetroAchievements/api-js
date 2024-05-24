import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserRecentlyPlayedGames } from "./getUserRecentlyPlayedGames";
import type { GetUserRecentlyPlayedGamesResponse } from "./models";

const server = setupServer();

describe("Function: getUserRecentlyPlayedGames", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserRecentlyPlayedGames).toBeDefined();
  });

  it(`retrieves a list of a given user's recently played games`, async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserRecentlyPlayedGamesResponse = [
      {
        GameID: "6278",
        ConsoleID: "12",
        ConsoleName: "PlayStation",
        Title: "Duke Nukem: Land of the Babes",
        ImageIcon: "/Images/054546.png",
        LastPlayed: "2022-11-06 16:08:21",
        NumPossibleAchievements: "42",
        PossibleScore: "478",
        NumAchieved: 0,
        ScoreAchieved: 0,
        NumAchievedHardcore: 0,
        ScoreAchievedHardcore: 0,
        MyVote: "2",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserRecentlyPlayedGames.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserRecentlyPlayedGames(authorization, {
      username: "xelnia",
    });

    // ASSERT
    expect(response).toEqual([
      {
        gameId: 6278,
        consoleId: 12,
        consoleName: "PlayStation",
        title: "Duke Nukem: Land of the Babes",
        imageIcon: "/Images/054546.png",
        lastPlayed: "2022-11-06 16:08:21",
        numPossibleAchievements: 42,
        possibleScore: 478,
        numAchieved: 0,
        scoreAchieved: 0,
        numAchievedHardcore: 0,
        scoreAchievedHardcore: 0,
        myVote: 2,
      },
    ]);
  });
});
