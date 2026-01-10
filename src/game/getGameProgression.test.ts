/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameProgression } from "./getGameProgression";
import type { GetGameProgressionResponse } from "./models";

const server = setupServer();

describe("Function: getGameProgression", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameProgression).toBeDefined();
  });

  it("given a game ID, retrieves information about the average time to unlock achievements in a game", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameProgressionResponse = {
      ID: 228,
      Title: "Super Mario World",
      ConsoleID: 3,
      ConsoleName: "SNES/Super Famicom",
      ImageIcon: "/Images/112443.png",
      NumDistinctPlayers: 79_281,
      TimesUsedInBeatMedian: 4493,
      TimesUsedInHardcoreBeatMedian: 8249,
      MedianTimeToBeat: 17_878,
      MedianTimeToBeatHardcore: 19_224,
      TimesUsedInCompletionMedian: 155,
      TimesUsedInMasteryMedian: 1091,
      MedianTimeToComplete: 67_017,
      MedianTimeToMaster: 79_744,
      NumAchievements: 89,
      Achievements: [
        {
          ID: 342,
          Title: "Giddy Up!",
          Description: "Catch a ride with a friend",
          Points: 1,
          TrueRatio: 1,
          Type: null,
          BadgeName: "46580",
          NumAwarded: 75_168,
          NumAwardedHardcore: 37_024,
          TimesUsedInUnlockMedian: 63,
          TimesUsedInHardcoreUnlockMedian: 69,
          MedianTimeToUnlock: 274,
          MedianTimeToUnlockHardcore: 323,
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameProgression.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGameProgression(authorization, {
      gameId: 104_370,
      hardcore: true,
    });

    // ASSERT
    expect(response).toEqual({
      id: 228,
      title: "Super Mario World",
      consoleId: 3,
      consoleName: "SNES/Super Famicom",
      imageIcon: "/Images/112443.png",
      numDistinctPlayers: 79_281,
      timesUsedInBeatMedian: 4493,
      timesUsedInHardcoreBeatMedian: 8249,
      medianTimeToBeat: 17_878,
      medianTimeToBeatHardcore: 19_224,
      timesUsedInCompletionMedian: 155,
      timesUsedInMasteryMedian: 1091,
      medianTimeToComplete: 67_017,
      medianTimeToMaster: 79_744,
      numAchievements: 89,
      achievements: [
        {
          id: 342,
          title: "Giddy Up!",
          description: "Catch a ride with a friend",
          points: 1,
          trueRatio: 1,
          type: null,
          badgeName: "46580",
          numAwarded: 75_168,
          numAwardedHardcore: 37_024,
          timesUsedInUnlockMedian: 63,
          timesUsedInHardcoreUnlockMedian: 69,
          medianTimeToUnlock: 274,
          medianTimeToUnlockHardcore: 323,
        },
      ],
    });
  });
});
