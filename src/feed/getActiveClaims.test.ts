/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getActiveClaims } from "./getActiveClaims";
import type { GetSetClaimsResponse } from "./models";

const server = setupServer();

describe("Function: getActiveClaims", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getActiveClaims).toBeDefined();
  });

  it("retrieves metadata about current active claims", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetSetClaimsResponse = [
      {
        ID: 7043,
        User: "siouxerskate",
        GameID: 3726,
        GameTitle: "Tactics Ogre: Let Us Cling Together",
        GameIcon: "/Images/049640.png",
        ConsoleName: "PlayStation Portable",
        ConsoleID: 1,
        ClaimType: 0,
        SetType: 0,
        Status: 0,
        Extension: 0,
        Special: 0,
        Created: "2022-10-03 20:29:45",
        DoneTime: "2023-01-03 20:29:45",
        Updated: "2022-10-03 20:29:45",
        MinutesLeft: 112_285,
        UserIsJrDev: 1,
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetActiveClaims.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getActiveClaims(authorization);

    // ASSERT
    expect(response).toEqual([
      {
        id: 7043,
        user: "siouxerskate",
        gameId: 3726,
        gameTitle: "Tactics Ogre: Let Us Cling Together",
        gameIcon: "/Images/049640.png",
        consoleName: "PlayStation Portable",
        consoleId: 1,
        claimType: 0,
        setType: 0,
        status: 0,
        extension: 0,
        special: 0,
        created: "2022-10-03 20:29:45",
        doneTime: "2023-01-03 20:29:45",
        updated: "2022-10-03 20:29:45",
        minutesLeft: 112_285,
        userIsJrDev: true,
      },
    ]);
  });
});
