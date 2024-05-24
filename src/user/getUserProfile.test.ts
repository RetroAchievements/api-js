import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserProfile } from "./getUserProfile";
import type { GetUserProfileResponse } from "./models";

const server = setupServer();

describe("Function: getUserProfile", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserProfile).toBeDefined();
  });

  it("given a username, retrieves minimal user profile information about the user", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserProfileResponse = {
      User: "MaxMilyin",
      UserPic: "/UserPic/MaxMilyin.png",
      MemberSince: "2016-01-02 00:43:04",
      RichPresenceMsg:
        "Playing ~Hack~ 11th Annual Vanilla Level Design Contest, The",
      LastGameID: 19_504,
      ContribCount: 0,
      ContribYield: 0,
      TotalPoints: 399_597,
      TotalSoftcorePoints: 0,
      TotalTruePoints: 1_599_212,
      Permissions: 1,
      Untracked: 0,
      ID: 16_446,
      UserWallActive: 1,
      Motto: "Join me on Twitch! GameSquadSquad for live RA",
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserProfile.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserProfile(authorization, {
      username: "WCopeland",
    });

    // ASSERT
    expect(response).toEqual({
      user: "MaxMilyin",
      userPic: "/UserPic/MaxMilyin.png",
      memberSince: "2016-01-02 00:43:04",
      richPresenceMsg:
        "Playing ~Hack~ 11th Annual Vanilla Level Design Contest, The",
      lastGameId: 19_504,
      contribCount: 0,
      contribYield: 0,
      totalPoints: 399_597,
      totalSoftcorePoints: 0,
      totalTruePoints: 1_599_212,
      permissions: 1,
      untracked: false,
      id: 16_446,
      userWallActive: true,
      motto: "Join me on Twitch! GameSquadSquad for live RA",
    });
  });
});
