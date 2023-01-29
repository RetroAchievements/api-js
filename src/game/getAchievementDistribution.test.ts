import { rest } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getAchievementDistribution } from "./getAchievementDistribution";
import type { GetAchievementDistributionResponse } from "./models";
import { AchievementDistributionFlags } from "./models";

const server = setupServer();

describe("Function: getAchievementDistribution", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getAchievementDistribution).toBeDefined();
  });

  it("given a game ID, retrieves the achievement distribution associated with the game", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1
    };

    let detectedSearchParams: URLSearchParams;

    server.use(
      rest.get(
        `${apiBaseUrl}/API_GetAchievementDistribution.php`,
        (req, res, ctx) => {
          detectedSearchParams = req.url.searchParams;
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(detectedSearchParams!.get("i")).toEqual("14402");
    expect(detectedSearchParams!.has("f")).toBeFalsy();
    expect(detectedSearchParams!.has("h")).toBeFalsy();
  });

  it("given flags, successfully attaches the option to the call", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1
    };

    let detectedSearchParams: URLSearchParams;

    server.use(
      rest.get(
        `${apiBaseUrl}/API_GetAchievementDistribution.php`,
        (req, res, ctx) => {
          detectedSearchParams = req.url.searchParams;
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
      flags: AchievementDistributionFlags.UnofficialAchievements
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(detectedSearchParams!.get("i")).toEqual("14402");
    expect(detectedSearchParams!.get("f")).toEqual(
      String(AchievementDistributionFlags.UnofficialAchievements)
    );
    expect(detectedSearchParams!.has("h")).toBeFalsy();
  });

  it("given a truthy hardcore value, successfully attaches the option to the call", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1
    };

    let detectedSearchParams: URLSearchParams;

    server.use(
      rest.get(
        `${apiBaseUrl}/API_GetAchievementDistribution.php`,
        (req, res, ctx) => {
          detectedSearchParams = req.url.searchParams;
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
      hardcore: true
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(detectedSearchParams!.get("i")).toEqual("14402");
    expect(detectedSearchParams!.get("h")).toEqual("1");
  });

  it("given a falsy hardcore value, successfully attaches the option to the call", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1
    };

    let detectedSearchParams: URLSearchParams;

    server.use(
      rest.get(
        `${apiBaseUrl}/API_GetAchievementDistribution.php`,
        (req, res, ctx) => {
          detectedSearchParams = req.url.searchParams;
          return res(ctx.json(mockResponse));
        }
      )
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
      hardcore: false
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(detectedSearchParams!.get("i")).toEqual("14402");
    expect(detectedSearchParams!.get("h")).toEqual("0");
  });
});
