/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameList } from "./getGameList";
import type { GetGameListResponse } from "./models";

const server = setupServer();

describe("Function: getGameList", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameList).toBeDefined();
  });

  it("retrieves a list of games and cleans their properties", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameListResponse = [
      {
        Title: "Elemental Master",
        ID: "4247",
        ConsoleID: "1",
        ConsoleName: "Mega Drive",
        ImageIcon: "/Images/048245.png",
        NumAchievements: 44,
        NumLeaderboards: 0,
        Points: 500,
        DateModified: "2021-12-09 17:05:39",
        ForumTopicID: 1972,
        Hashes: [
          "32e1a15161ef1f070b023738353bde51",
          "9b04970a603ace521c7cca2acaf69804",
        ],
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameList.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGameList(authorization, {
      consoleId: 1,
      shouldRetrieveGameHashes: true,
    });

    // ASSERT
    expect(response).toEqual([
      {
        title: "Elemental Master",
        id: 4247,
        consoleId: 1,
        consoleName: "Mega Drive",
        imageIcon: "/Images/048245.png",
        numAchievements: 44,
        numLeaderboards: 0,
        points: 500,
        dateModified: "2021-12-09 17:05:39",
        forumTopicId: 1972,
        hashes: [
          "32e1a15161ef1f070b023738353bde51",
          "9b04970a603ace521c7cca2acaf69804",
        ],
      },
    ]);
  });
});
