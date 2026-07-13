import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameLeaderboards } from "./getGameLeaderboards";
import type { GameLeaderboards, GetGameLeaderboardsResponse } from "./models";

const server = setupServer();

describe("Function: getGameLeaderboards", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameLeaderboards).toBeDefined();
  });

  it("using defaults, retrieves the list of game leaderboards for the given game id", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse = mockGetGameLeaderboardsResponse;

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameLeaderboards.php`, (info) => {
        const url = new URL(info.request.url);
        expect(url.searchParams.get("i")).toBe(mockGameId);
        expect(url.searchParams.has("c")).toBeFalsy();
        expect(url.searchParams.has("o")).toBeFalsy();
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getGameLeaderboards(authorization, {
      gameId: mockGameId,
    });
    expect(response).toEqual(mockGameLeaderboardsValue);
  });

  it.each([{ offset: 1, count: 1 }, { offset: 5 }, { count: 20 }])(
    "calls the 'Game Leaderboards' endpoint with a given offset ($offset) and/or count ($count)",
    async ({ offset: mockOffset, count: mockCount }) => {
      // ARRANGE
      const authorization = buildAuthorization({
        username: "mockUserName",
        webApiKey: "mockWebApiKey",
      });

      server.use(
        http.get(`${apiBaseUrl}/API_GetGameLeaderboards.php`, (info) => {
          const url = new URL(info.request.url);
          const c = url.searchParams.get("c");
          const o = url.searchParams.get("o");
          expect(url.searchParams.get("i")).toBe(mockGameId);
          expect(String(c)).toEqual(String(mockCount ?? null));
          expect(String(o)).toEqual(String(mockOffset ?? null));
          return HttpResponse.json(mockGetGameLeaderboardsResponse);
        })
      );

      // ACT
      await getGameLeaderboards(authorization, {
        gameId: mockGameId,
        offset: mockOffset,
        count: mockCount,
      });
    }
  );

  it.each([
    { status: 503, statusText: "The API is currently down" },
    { status: 422, statusText: "HTTP Error: Status 422 Unprocessable Entity" },
  ])(
    "given the API returns a $status, throws an error",
    async ({ status, statusText }) => {
      // ARRANGE
      const authorization = buildAuthorization({
        username: "mockUserName",
        webApiKey: "mockWebApiKey",
      });

      const mockResponse = `<html><body>${statusText}</body></html>`;

      server.use(
        http.get(`${apiBaseUrl}/API_GetGameLeaderboards.php`, () =>
          HttpResponse.json(mockResponse, { status, statusText })
        )
      );

      // ASSERT
      await expect(
        getGameLeaderboards(authorization, { gameId: mockGameId })
      ).rejects.toThrow();
    }
  );
});

const mockGameId = "14402";

const mockGetGameLeaderboardsResponse: GetGameLeaderboardsResponse = {
  Count: 1,
  Total: 1,
  Results: [
    {
      ID: 1234,
      RankAsc: false,
      Title: "South Island Conqueror",
      Description: "Complete the game with the highest score possible.",
      Format: "VALUE",
      Author: "Example",
      AuthorULID: "0123456789ABCDEFGHIJKLMNO",
      State: "active",
      TopEntry: {
        User: "TopExample",
        ULID: "ONMLKJIHGFEDCBA9876543210",
        Score: 98_765,
        FormattedScore: "98,765",
      },
    },
  ],
};

const mockGameLeaderboardsValue: GameLeaderboards = {
  count: 1,
  total: 1,
  results: [
    {
      id: 1234,
      rankAsc: false,
      title: "South Island Conqueror",
      description: "Complete the game with the highest score possible.",
      format: "VALUE",
      author: "Example",
      authorUlid: "0123456789ABCDEFGHIJKLMNO",
      state: "active",
      topEntry: {
        user: "TopExample",
        ulid: "ONMLKJIHGFEDCBA9876543210",
        score: 98_765,
        formattedScore: "98,765",
      },
    },
  ],
};
