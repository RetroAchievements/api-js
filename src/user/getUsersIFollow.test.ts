import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUsersIFollow } from "./getUsersIFollow";
import type { GetUsersIFollowResponse, UsersIFollow } from "./models";

const server = setupServer();

describe("Funcion: getUsersIFollow", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUsersIFollow).toBeDefined();
  });

  it("using defaults, retrieves the list of users that the caller follows", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse = mockGetUsersIFollowResponse;

    server.use(
      http.get(`${apiBaseUrl}/API_GetUsersIFollow.php`, (info) => {
        const url = new URL(info.request.url);
        expect(url.searchParams.has("c")).toBeFalsy();
        expect(url.searchParams.has("o")).toBeFalsy();
        return HttpResponse.json(mockResponse);
      })
    );

    // ACT
    const response = await getUsersIFollow(authorization);
    expect(response).toEqual(mockUsersIFollowValue);
  });

  it.each([{ offset: 1, count: 1 }, { offset: 5 }, { count: 20 }])(
    "calls the 'Users I Follow' endpoint with a given offset ($offset) and/or count ($count)",
    async (mockPayload) => {
      // ARRANGE
      const authorization = buildAuthorization({
        username: "mockUserName",
        webApiKey: "mockWebApiKey",
      });

      server.use(
        http.get(`${apiBaseUrl}/API_GetUsersIFollow.php`, (info) => {
          const url = new URL(info.request.url);
          const c = url.searchParams.get("c");
          const o = url.searchParams.get("o");
          expect(String(c)).toEqual(String(mockPayload.count ?? null));
          expect(String(o)).toEqual(String(mockPayload.offset ?? null));
          return HttpResponse.json(mockGetUsersIFollowResponse);
        })
      );

      // ACT
      await getUsersIFollow(authorization, mockPayload);
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
        http.get(`${apiBaseUrl}/API_GetUsersIFollow.php`, () =>
          HttpResponse.json(mockResponse, { status, statusText })
        )
      );

      // ASSERT
      await expect(
        getUsersIFollow(authorization, { count: 0 })
      ).rejects.toThrow();
    }
  );
});

const mockGetUsersIFollowResponse: GetUsersIFollowResponse = {
  Count: 1,
  Total: 1,
  Results: [
    {
      User: "Example",
      ULID: "0123456789ABCDEFGHIJKLMNO",
      Points: 9001,
      PointsSoftcore: 101,
      IsFollowingMe: false,
    },
  ],
};

const mockUsersIFollowValue: UsersIFollow = {
  count: 1,
  total: 1,
  results: [
    {
      user: "Example",
      ulid: "0123456789ABCDEFGHIJKLMNO",
      points: 9001,
      pointsSoftcore: 101,
      isFollowingMe: false,
    },
  ],
};
