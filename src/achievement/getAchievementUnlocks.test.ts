import { rest } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getAchievementUnlocks } from "./getAchievementUnlocks";
import type { GetAchievementUnlocksResponse } from "./models";

const server = setupServer();

describe("Function: getAchievementUnlocks", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAchievementUnlocks).toBeDefined();
  });

  it("retrieves metadata about unlocks for a target achievement", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementUnlocksResponse = [
      {
        User: "Podgicus0305",
        RAPoints: "15544",
        DateAwarded: "2022-07-12 19:06:34",
        HardcoreMode: "1"
      }
    ];

    let searchParams = "";

    server.use(
      rest.get(
        `${apiBaseUrl}/API_GetAchievementUnlocks.php`,
        (req, res, ctx) => {
          searchParams = req.url.search;
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getAchievementUnlocks(authorization, {
      achievementId: 18_000,
      count: 1,
      offset: 1
    });

    // ASSERT
    expect(searchParams).toContain("a=18000");
    expect(searchParams).toContain("o=1");
    expect(searchParams).toContain("c=1");

    expect(response).toEqual([
      {
        user: "Podgicus0305",
        raPoints: 15_544,
        dateAwarded: "2022-07-12 19:06:34",
        hardcoreMode: true
      }
    ]);
  });
});
