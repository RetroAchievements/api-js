/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserClaims } from "./getUserClaims";
import type { GetUserClaimsResponse } from "./models";

const server = setupServer();

describe("Function: getUserClaims", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserClaims).toBeDefined();
  });

  it("given a username, retrieves a list of achievement set claims for the user", async () => {
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserClaimsResponse = [
      {
        ID: "1685",
        User: "Jamiras",
        GameID: "1492",
        GameTitle: "Pinball Quest",
        GameIcon: "/Images/011326.png",
        ConsoleName: "NES",
        ClaimType: "0",
        SetType: "0",
        Status: "1",
        Extension: "0",
        Special: "0",
        Created: "2017-08-20 00:00:00",
        DoneTime: "2017-08-20 00:00:00",
        Updated: "2022-06-28 17:15:59",
        MinutesLeft: "-2862348",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserClaims.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserClaims(authorization, {
      username: "Jamiras",
    });

    // ASSERT
    expect(response).toEqual([
      {
        id: 1685,
        user: "Jamiras",
        gameId: 1492,
        gameTitle: "Pinball Quest",
        gameIcon: "/Images/011326.png",
        consoleName: "NES",
        claimType: 0,
        setType: 0,
        status: 1,
        extension: 0,
        special: 0,
        created: "2017-08-20 00:00:00",
        doneTime: "2017-08-20 00:00:00",
        updated: "2022-06-28 17:15:59",
        minutesLeft: -2_862_348,
      },
    ]);
  });
});
