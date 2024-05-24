/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameInfoAndUserProgress } from "./getGameInfoAndUserProgress";
import type { GetGameInfoAndUserProgressResponse } from "./models";

const server = setupServer();

describe("Function: getGameInfoAndUserProgress", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameInfoAndUserProgress).toBeDefined();
  });

  it("given a game ID and a username, retrieves extended metadata about the game and that user`s progress", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameInfoAndUserProgressResponse = {
      ID: 14_402,
      Title: "Dragster",
      ConsoleID: 25,
      ForumTopicID: 9145,
      Flags: 0,
      ImageIcon: "/Images/026368.png",
      ImageTitle: "/Images/026366.png",
      ImageIngame: "/Images/026367.png",
      ImageBoxArt: "/Images/026365.png",
      Publisher: "Activision ",
      Developer: "David Crane",
      Genre: "Racing",
      Released: "1980",
      IsFinal: false,
      ConsoleName: "Atari 2600",
      RichPresencePatch: "2b92fa1bf9635c303b3b7f8feea3ed3c",
      NumAchievements: 12,
      NumDistinctPlayersCasual: "454",
      NumDistinctPlayersHardcore: "323",
      Achievements: {
        "79434": {
          ID: "79434",
          NumAwarded: "338",
          NumAwardedHardcore: "253",
          Title: "Novice Dragster Driver 1",
          Description: "Complete your very first race in game 1.",
          Points: "1",
          TrueRatio: "1",
          Author: "Boldewin",
          DateModified: "2019-08-01 19:03:46",
          DateCreated: "2019-07-31 18:49:57",
          BadgeName: "85541",
          DisplayOrder: "0",
          MemAddr: "f5c41fa0b5fa0d5fbb8a74c598f18582",
          DateEarned: "2022-08-23 22:56:38",
          DateEarnedHardcore: "2022-08-23 22:56:38",
        },
      },
      NumAwardedToUser: 12,
      NumAwardedToUserHardcore: 12,
      UserCompletion: "100.00%",
      UserCompletionHardcore: "100.00%",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameInfoAndUserProgress.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGameInfoAndUserProgress(authorization, {
      gameId: 14_402,
      username: "xelnia",
    });

    // ASSERT
    expect(response).toEqual({
      id: 14_402,
      title: "Dragster",
      consoleId: 25,
      forumTopicId: 9145,
      flags: 0,
      imageIcon: "/Images/026368.png",
      imageTitle: "/Images/026366.png",
      imageIngame: "/Images/026367.png",
      imageBoxArt: "/Images/026365.png",
      publisher: "Activision ",
      developer: "David Crane",
      genre: "Racing",
      released: "1980",
      isFinal: false,
      consoleName: "Atari 2600",
      richPresencePatch: "2b92fa1bf9635c303b3b7f8feea3ed3c",
      numAchievements: 12,
      numDistinctPlayersCasual: 454,
      numDistinctPlayersHardcore: 323,
      achievements: {
        "79434": {
          id: 79_434,
          numAwarded: 338,
          numAwardedHardcore: 253,
          title: "Novice Dragster Driver 1",
          description: "Complete your very first race in game 1.",
          points: 1,
          trueRatio: 1,
          author: "Boldewin",
          dateModified: "2019-08-01 19:03:46",
          dateCreated: "2019-07-31 18:49:57",
          badgeName: "85541",
          displayOrder: 0,
          memAddr: "f5c41fa0b5fa0d5fbb8a74c598f18582",
          dateEarned: "2022-08-23 22:56:38",
          dateEarnedHardcore: "2022-08-23 22:56:38",
        },
      },
      numAwardedToUser: 12,
      numAwardedToUserHardcore: 12,
      userCompletion: "100.00%",
      userCompletionHardcore: "100.00%",
    });
  });
});
