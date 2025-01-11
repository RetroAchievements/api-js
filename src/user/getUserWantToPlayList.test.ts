/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserWantToPlayList } from "./getUserWantToPlayList";
import type { GetUserWantToPlayListResponse } from "./models";

const server = setupServer();

describe("Function: getUserWantToPlayList", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserWantToPlayList).toBeDefined();
  });

  it('given a username, retrieves that users "Want To Play Games"', async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserWantToPlayListResponse = {
      Count: 100,
      Total: 1287,
      Results: [
        {
          ID: 20_246,
          Title: "~Hack~ Knuckles the Echidna in Sonic the Hedgehog",
          ImageIcon: "/Images/074560.png",
          ConsoleID: 1,
          ConsoleName: "Genesis/Mega Drive",
          PointsTotal: 1500,
          AchievementsPublished: 50,
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserWantToPlayList.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserWantToPlayList(authorization, {
      username: "xelnia",
    });

    // ASSERT
    expect(response).toEqual({
      count: 100,
      total: 1287,
      results: [
        {
          id: 20_246,
          title: "~Hack~ Knuckles the Echidna in Sonic the Hedgehog",
          imageIcon: "/Images/074560.png",
          consoleId: 1,
          consoleName: "Genesis/Mega Drive",
          pointsTotal: 1500,
          achievementsPublished: 50,
        },
      ],
    });
  });
});
