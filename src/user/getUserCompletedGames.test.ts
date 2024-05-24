/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserCompletedGames } from "./getUserCompletedGames";
import type { GetUserCompletedGamesResponse } from "./models";

const server = setupServer();

describe("Function: getUserCompletedGames", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserCompletedGames).toBeDefined();
  });

  it("given a username, returns completion metadata", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserCompletedGamesResponse = [
      {
        GameID: "1881",
        Title: "Popeye",
        ImageIcon: "/Images/065073.png",
        ConsoleID: "7",
        ConsoleName: "NES",
        MaxPossible: "26",
        NumAwarded: "12",
        PctWon: "0.4615",
        HardcoreMode: "0",
      },
      {
        GameID: "1881",
        Title: "Popeye",
        ImageIcon: "/Images/065073.png",
        ConsoleID: "7",
        ConsoleName: "NES",
        MaxPossible: "26",
        NumAwarded: "12",
        PctWon: "0.4615",
        HardcoreMode: "1",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserCompletedGames.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserCompletedGames(authorization, {
      username: "xelnia",
    });

    // ASSERT
    expect(response).toEqual([
      {
        gameId: 1881,
        title: "Popeye",
        imageIcon: "/Images/065073.png",
        consoleId: 7,
        consoleName: "NES",
        maxPossible: 26,
        numAwarded: 12,
        pctWon: 0.4615,
        hardcoreMode: false,
      },
      {
        gameId: 1881,
        title: "Popeye",
        imageIcon: "/Images/065073.png",
        consoleId: 7,
        consoleName: "NES",
        maxPossible: 26,
        numAwarded: 12,
        pctWon: 0.4615,
        hardcoreMode: true,
      },
    ]);
  });
});
