import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getTopTenUsers } from "./getTopTenUsers";
import type { GetTopTenUsersResponse } from "./models";

const server = setupServer();

describe("Function: getTopTenUsers", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getTopTenUsers).toBeDefined();
  });

  it("retrieves metadata about the current top ten users on the site", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetTopTenUsersResponse = [
      { "1": "MaxMilyin", "2": "346289", "3": "995092" },
      { "1": "HippopotamusRex", "2": "312118", "3": "1151351" },
      { "1": "Sarconius", "2": "257862", "3": "1181770" },
      { "1": "guineu", "2": "241623", "3": "672597" },
      { "1": "Andrey199650", "2": "240101", "3": "567522" },
      { "1": "Wendigo", "2": "227903", "3": "1099685" },
      { "1": "donutweegee", "2": "204701", "3": "587221" },
      { "1": "AmericanNinja", "2": "202980", "3": "567618" },
      { "1": "Infernum", "2": "202171", "3": "689967" },
      { "1": "FabricioPrie", "2": "196974", "3": "450436" },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetTopTenUsers.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getTopTenUsers(authorization);

    // ASSERT
    expect(response).toEqual([
      {
        username: "MaxMilyin",
        totalPoints: 346_289,
        totalRatioPoints: 995_092,
      },
      {
        username: "HippopotamusRex",
        totalPoints: 312_118,
        totalRatioPoints: 1_151_351,
      },
      {
        username: "Sarconius",
        totalPoints: 257_862,
        totalRatioPoints: 1_181_770,
      },
      { username: "guineu", totalPoints: 241_623, totalRatioPoints: 672_597 },
      {
        username: "Andrey199650",
        totalPoints: 240_101,
        totalRatioPoints: 567_522,
      },
      {
        username: "Wendigo",
        totalPoints: 227_903,
        totalRatioPoints: 1_099_685,
      },
      {
        username: "donutweegee",
        totalPoints: 204_701,
        totalRatioPoints: 587_221,
      },
      {
        username: "AmericanNinja",
        totalPoints: 202_980,
        totalRatioPoints: 567_618,
      },
      {
        username: "Infernum",
        totalPoints: 202_171,
        totalRatioPoints: 689_967,
      },
      {
        username: "FabricioPrie",
        totalPoints: 196_974,
        totalRatioPoints: 450_436,
      },
    ]);
  });
});
