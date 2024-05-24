/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserSummary } from "./getUserSummary";
import type { GetUserSummaryResponse, UserSummary } from "./models";

const server = setupServer();

describe("Function: getUserSummary", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserSummary).toBeDefined();
  });

  it("given a username, retrieves user summary information about the user", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse = mockGetUserSummaryResponse;

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserSummary.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserSummary(authorization, {
      username: "WCopeland",
    });

    // ASSERT
    expect(response).toEqual(mockExpectedSummaryValue);
  });

  it("given the API returns a 503, throws an error", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse = "<html><body>the api is down</body></html>";

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserSummary.php`, () =>
        HttpResponse.json(mockResponse, { status: 503 })
      )
    );

    // ASSERT
    await expect(
      getUserSummary(authorization, { username: "WCopeland" })
    ).rejects.toThrow();
  });
});

const mockGetUserSummaryResponse: GetUserSummaryResponse = {
  RecentlyPlayedCount: 2,
  RecentlyPlayed: [
    {
      GameID: "19020",
      ConsoleID: "21",
      ConsoleName: "PlayStation 2",
      Title: "Mortal Kombat: Deadly Alliance",
      ImageIcon: "/Images/064938.png",
      LastPlayed: "2023-01-27 02:05:02",
    },
    {
      GameID: "15922",
      ConsoleID: "7",
      ConsoleName: "NES",
      Title: "~Hack~ Mega Man 3 Revamped",
      ImageIcon: "/Images/061792.png",
      LastPlayed: "2022-11-07 21:49:09",
    },
  ],
  MemberSince: "2020-02-02 20:10:35",
  LastActivity: {
    ID: "59195489",
    timestamp: "2023-01-27 02:13:21",
    lastupdate: "2023-01-27 02:13:21",
    activitytype: "1",
    User: "WCopeland",
    data: "281263",
    data2: "1",
  },
  RichPresenceMsg: "Arcade [Match 2] - Nitara vs Drahmin (Novice difficulty)",
  LastGameID: "19020",
  LastGame: {
    ID: 19_020,
    Title: "Mortal Kombat: Deadly Alliance",
    ConsoleID: 21,
    ForumTopicID: 19_339,
    Flags: 0,
    ImageIcon: "/Images/064938.png",
    ImageTitle: "/Images/057355.png",
    ImageIngame: "/Images/057356.png",
    ImageBoxArt: "/Images/056153.png",
    Publisher: "Midway",
    Developer: "Midway",
    Genre: "3D Fighting",
    Released: "November 16, 2002",
    IsFinal: false,
    ConsoleName: "PlayStation 2",
    RichPresencePatch: "MockRichPresencePatch",
  },
  ContribCount: "0",
  ContribYield: "0",
  TotalPoints: "18817",
  TotalSoftcorePoints: "25",
  TotalTruePoints: "56984",
  Permissions: "1",
  Untracked: "0",
  ID: "117089",
  UserWallActive: "1",
  Motto: "https://i.imgur.com/ov30jeD.jpg",
  Rank: 1372,
  Awarded: {
    "1829": {
      NumPossibleAchievements: "80",
      PossibleScore: "738",
      NumAchieved: "16",
      ScoreAchieved: "95",
      NumAchievedHardcore: "16",
      ScoreAchievedHardcore: "95",
    },
    "6278": {
      NumPossibleAchievements: "42",
      PossibleScore: "478",
      NumAchieved: 0,
      ScoreAchieved: 0,
      NumAchievedHardcore: 0,
      ScoreAchievedHardcore: 0,
    },
  },
  RecentAchievements: {
    "19020": {
      "281248": {
        ID: "281248",
        GameID: "19020",
        GameTitle: "Mortal Kombat: Deadly Alliance",
        Title: "Head Stomp",
        Description: "Perform a Fatality as Jax.",
        Points: "3",
        BadgeName: "311063",
        IsAwarded: "1",
        DateAwarded: "2023-01-27 02:04:36",
        HardcoreAchieved: "0",
      },
    },
  },
  Points: "18817",
  SoftcorePoints: "25",
  UserPic: "/UserPic/WCopeland.png",
  TotalRanked: 34_572,
  Status: "Offline",
};

const mockExpectedSummaryValue: UserSummary = {
  recentlyPlayedCount: 2,
  recentlyPlayed: [
    {
      gameId: 19_020,
      consoleId: 21,
      consoleName: "PlayStation 2",
      title: "Mortal Kombat: Deadly Alliance",
      imageIcon: "/Images/064938.png",
      lastPlayed: "2023-01-27 02:05:02",
    },
    {
      gameId: 15_922,
      consoleId: 7,
      consoleName: "NES",
      title: "~Hack~ Mega Man 3 Revamped",
      imageIcon: "/Images/061792.png",
      lastPlayed: "2022-11-07 21:49:09",
    },
  ],
  memberSince: "2020-02-02 20:10:35",
  lastActivity: {
    id: 59_195_489,
    timestamp: "2023-01-27 02:13:21",
    lastupdate: "2023-01-27 02:13:21",
    activitytype: 1,
    user: "WCopeland",
    data: "281263",
    data2: "1",
  },
  richPresenceMsg: "Arcade [Match 2] - Nitara vs Drahmin (Novice difficulty)",
  lastGameId: 19_020,
  lastGame: {
    id: 19_020,
    title: "Mortal Kombat: Deadly Alliance",
    consoleId: 21,
    forumTopicId: 19_339,
    flags: 0,
    imageIcon: "/Images/064938.png",
    imageTitle: "/Images/057355.png",
    imageIngame: "/Images/057356.png",
    imageBoxArt: "/Images/056153.png",
    publisher: "Midway",
    developer: "Midway",
    genre: "3D Fighting",
    released: "November 16, 2002",
    isFinal: false,
    consoleName: "PlayStation 2",
    richPresencePatch: "MockRichPresencePatch",
  },
  contribCount: 0,
  contribYield: 0,
  totalPoints: 18_817,
  totalSoftcorePoints: 25,
  totalTruePoints: 56_984,
  permissions: 1,
  untracked: false,
  id: 117_089,
  userWallActive: true,
  motto: "https://i.imgur.com/ov30jeD.jpg",
  rank: 1372,
  awarded: {
    "1829": {
      numPossibleAchievements: 80,
      possibleScore: 738,
      numAchieved: 16,
      scoreAchieved: 95,
      numAchievedHardcore: 16,
      scoreAchievedHardcore: 95,
    },
    "6278": {
      numPossibleAchievements: 42,
      possibleScore: 478,
      numAchieved: 0,
      scoreAchieved: 0,
      numAchievedHardcore: 0,
      scoreAchievedHardcore: 0,
    },
  },
  recentAchievements: {
    19_020: {
      281_248: {
        id: 281_248,
        gameId: 19_020,
        gameTitle: "Mortal Kombat: Deadly Alliance",
        title: "Head Stomp",
        description: "Perform a Fatality as Jax.",
        points: 3,
        badgeName: "311063",
        isAwarded: true,
        dateAwarded: "2023-01-27 02:04:36",
        hardcoreAchieved: false,
      },
    },
  },
  points: 18_817,
  softcorePoints: 25,
  userPic: "/UserPic/WCopeland.png",
  totalRanked: 34_572,
  status: "Offline",
};
