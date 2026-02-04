import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserSetRequests } from "./getUserSetRequests";
import type { GetUserSetRequestsResponse, UserSetRequests } from "./models";
import { RequestListType } from "./models";

const server = setupServer();

describe("Function: getUserSetRequests", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserSetRequests).toBeDefined();
  });

  it("using defaults, retrieves the list of set requests of the given user", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse = mockGetUserSetRequestsResponse;

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserSetRequests.php`, (info) => {
        const url = new URL(info.request.url);
        expect(url.searchParams.get("u")).toEqual(mockOtherUsername);
        expect(url.searchParams.has("t")).toBeFalsy();
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getUserSetRequests(authorization, {
      username: mockOtherUsername,
    });
    expect(response).toEqual(mockUserSetRequestsValue);
  });

  it.each([
    { requestListType: RequestListType.ActiveRequests },
    { requestListType: RequestListType.AllRequests },
  ])(
    "calls the 'User Set Requests' endpoint with a given request list type ($requestListType)",
    async ({ requestListType: expectedRequestListType }) => {
      // ARRANGE
      const authorization = buildAuthorization({
        username: "mockUserName",
        webApiKey: "mockWebApiKey",
      });

      server.use(
        http.get(`${apiBaseUrl}/API_GetUserSetRequests.php`, (info) => {
          const url = new URL(info.request.url);
          expect(url.searchParams.get("u")).toEqual(mockOtherUsername);
          expect(url.searchParams.get("t")).toEqual(
            String(expectedRequestListType)
          );
          return HttpResponse.json(mockGetUserSetRequestsResponse);
        })
      );

      // ACT
      await getUserSetRequests(authorization, {
        username: mockOtherUsername,
        requestListType: expectedRequestListType,
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
        http.get(`${apiBaseUrl}/API_GetUserSetRequests.php`, () =>
          HttpResponse.json(mockResponse, { status, statusText })
        )
      );

      // ASSERT
      await expect(
        getUserSetRequests(authorization, { username: mockOtherUsername })
      ).rejects.toThrow();
    }
  );
});

const mockOtherUsername = "otherMockUser";

const mockGetUserSetRequestsResponse: GetUserSetRequestsResponse = {
  RequestedSets: [
    {
      GameID: 8149,
      Title: "Example Set 1",
      ConsoleID: 0,
      ConsoleName: "Example Console",
      ImageIcon: "/Images/000001.png",
    },
    {
      GameID: 9001,
      Title: "Example Set 2",
      ConsoleID: 2,
      ConsoleName: "Example Console 2",
      ImageIcon: "/Images/000002.png",
    },
  ],
  TotalRequests: 5,
  PointsForNext: 5000,
};

const mockUserSetRequestsValue: UserSetRequests = {
  requestedSets: [
    {
      gameId: 8149,
      title: "Example Set 1",
      consoleId: 0,
      consoleName: "Example Console",
      imageIcon: "/Images/000001.png",
    },
    {
      gameId: 9001,
      title: "Example Set 2",
      consoleId: 2,
      consoleName: "Example Console 2",
      imageIcon: "/Images/000002.png",
    },
  ],
  totalRequests: 5,
  pointsForNext: 5000,
};
