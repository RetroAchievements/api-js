import { http, HttpResponse } from "msw";
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
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1,
    };

    let requestUrl = "";

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementDistribution.php`, (info) => {
        requestUrl = info.request.url;

        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(requestUrl).toContain("i=14402");
    expect(requestUrl).not.toContain("f=");
    expect(requestUrl).not.toContain("h=");
  });

  it("given flags, successfully attaches the option to the call", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1,
    };

    let requestUrl = "";

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementDistribution.php`, (info) => {
        requestUrl = info.request.url;
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
      flags: AchievementDistributionFlags.UnofficialAchievements,
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(requestUrl).toContain("i=14402");
    expect(requestUrl).toContain(
      `f=${AchievementDistributionFlags.UnofficialAchievements}`
    );
    expect(requestUrl).not.toContain("h=");
  });

  it("given a truthy hardcore value, successfully attaches the option to the call", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1,
    };

    let requestUrl = "";

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementDistribution.php`, (info) => {
        requestUrl = info.request.url;
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
      hardcore: true,
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(requestUrl).toContain("i=14402");
    expect(requestUrl).toContain("h=1");
  });

  it("given a falsy hardcore value, successfully attaches the option to the call", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetAchievementDistributionResponse = {
      "1": 20,
      "2": 10,
      "3": 8,
      "4": 4,
      "5": 1,
    };

    let requestUrl = "";

    server.use(
      http.get(`${apiBaseUrl}/API_GetAchievementDistribution.php`, (info) => {
        requestUrl = info.request.url;
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getAchievementDistribution(authorization, {
      gameId: 14_402,
      hardcore: false,
    });

    // ASSERT
    expect(response).toEqual(mockResponse);

    expect(requestUrl).toContain("i=14402");
    expect(requestUrl).toContain("h=0");
  });
});
