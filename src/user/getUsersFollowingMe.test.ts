import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUsersFollowingMe } from "./getUsersFollowingMe";
import type { GetUsersFollowingMeResponse, UsersFollowingMe } from "./models";

const server = setupServer();

describe("Function: getUsersFollowingMe", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUsersFollowingMe).toBeDefined();
  });

  it("using defaults, retrieves the list of users that are following the caller", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse = mockGetUsersFollowingMeResponse;

    server.use(
      http.get(`${apiBaseUrl}/API_GetUsersFollowingMe.php`, (info) => {
        const url = new URL(info.request.url);
        expect(url.searchParams.has("c")).toBeFalsy();
        expect(url.searchParams.has("o")).toBeFalsy();
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getUsersFollowingMe(authorization);
    expect(response).toEqual(mockUsersFollowingMeValue);
  });

  it.each([{ offset: 1, count: 1 }, { offset: 5 }, { count: 20 }])(
    "calls the 'Users Following Me' endpoint with a given offset ($offset) and/or count ($count)",
    async (mockPayload) => {
      // ARRANGE
      const authorization = buildAuthorization({
        username: "mockUserName",
        webApiKey: "mockWebApiKey",
      });

      server.use(
        http.get(`${apiBaseUrl}/API_GetUsersFollowingMe.php`, (info) => {
          const url = new URL(info.request.url);
          const c = url.searchParams.get("c");
          const o = url.searchParams.get("o");
          expect(String(c)).toEqual(String(mockPayload.count ?? null));
          expect(String(o)).toEqual(String(mockPayload.offset ?? null));
          return HttpResponse.json(mockGetUsersFollowingMeResponse);
        })
      );

      // ACT
      await getUsersFollowingMe(authorization, mockPayload);
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
        http.get(`${apiBaseUrl}/API_GetUsersFollowingMe.php`, () =>
          HttpResponse.json(mockResponse, { status, statusText })
        )
      );

      // ASSERT
      await expect(
        getUsersFollowingMe(authorization, { count: 0 })
      ).rejects.toThrow();
    }
  );
});

const mockGetUsersFollowingMeResponse: GetUsersFollowingMeResponse = {
  Count: 1,
  Total: 1,
  Results: [
    {
      User: "Example",
      ULID: "0123456789ABCDEFGHIJKLMNO",
      Points: 9001,
      PointsSoftcore: 101,
      AmIFollowing: true,
    },
  ],
};

const mockUsersFollowingMeValue: UsersFollowingMe = {
  count: 1,
  total: 1,
  results: [
    {
      user: "Example",
      ulid: "0123456789ABCDEFGHIJKLMNO",
      points: 9001,
      pointsSoftcore: 101,
      amIFollowing: true,
    },
  ],
};
