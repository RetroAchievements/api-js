import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserCompletionProgress } from "./getUserCompletionProgress";
import type { GetUserCompletionProgressResponse } from "./models";

const server = setupServer();

describe("Function: getUserCompletionProgress", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserCompletionProgress).toBeDefined();
  });

  it("retrieves completion progress by username", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserCompletionProgressResponse = {
      Count: 1,
      Total: 1,
      Results: [
        {
          GameID: 680,
          Title: "Game & Watch Gallery",
          ImageIcon: "/Images/042952.png",
          ConsoleID: 4,
          ConsoleName: "Game Boy",
          MaxPossible: 27,
          NumAwarded: 8,
          NumAwardedHardcore: 8,
          MostRecentAwardedDate: "2022-07-26T23:56:15+00:00",
          HighestAwardKind: null,
          HighestAwardDate: null,
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserCompletionProgress.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserCompletionProgress(authorization, {
      username: "xelnia",
    });

    // ASSERT
    expect(response).toEqual({
      count: 1,
      total: 1,
      results: [
        {
          gameId: 680,
          title: "Game & Watch Gallery",
          imageIcon: "/Images/042952.png",
          consoleId: 4,
          consoleName: "Game Boy",
          maxPossible: 27,
          numAwarded: 8,
          numAwardedHardcore: 8,
          mostRecentAwardedDate: "2022-07-26T23:56:15+00:00",
          highestAwardKind: null,
          highestAwardDate: null,
        },
      ],
    });
  });
});
