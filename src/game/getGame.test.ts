/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGame } from "./getGame";
import type { GetGameResponse } from "./models";

const server = setupServer();

describe("Function: getGame", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGame).toBeDefined();
  });

  it("given a game ID, retrieves basic metadata about the game", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameResponse = {
      ID: "14402",
      Title: "Dragster",
      ForumTopicID: "9145",
      ConsoleID: "25",
      ConsoleName: "Atari 2600",
      Flags: "0",
      ImageIcon: "/Images/026368.png",
      GameIcon: "/Images/026368.png",
      ImageTitle: "/Images/026366.png",
      ImageIngame: "/Images/026367.png",
      ImageBoxArt: "/Images/026365.png",
      Publisher: "Activision ",
      Developer: "David Crane",
      Genre: "Racing",
      Released: "1980",
      GameTitle: "Dragster",
      Console: "Atari 2600",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetGame.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGame(authorization, { gameId: 14_402 });

    // ASSERT
    expect(response).toEqual({
      id: 14_402,
      title: "Dragster",
      forumTopicId: 9145,
      consoleId: 25,
      consoleName: "Atari 2600",
      flags: 0,
      imageIcon: "/Images/026368.png",
      gameIcon: "/Images/026368.png",
      imageTitle: "/Images/026366.png",
      imageIngame: "/Images/026367.png",
      imageBoxArt: "/Images/026365.png",
      publisher: "Activision ",
      developer: "David Crane",
      genre: "Racing",
      released: "1980",
      gameTitle: "Dragster",
      console: "Atari 2600",
    });
  });
});
