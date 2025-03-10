/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getComments } from "./getComments";
import type { Comments, GetCommentsResponse } from "./models";

const server = setupServer();

describe("Function: getComments", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getComments).toBeDefined();
  });

  it("retrieves the comments on a user's wall", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetCommentsResponse = {
      Count: 2,
      Total: 2,
      Results: [
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 1",
        },
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 2",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetComments.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getComments(authorization, {
      identifier: "xelnia",
    });

    // ASSERT
    const expectedResponse: Comments = {
      count: 2,
      total: 2,
      results: [
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 1",
        },
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 2",
        },
      ],
    };

    expect(response).toEqual(expectedResponse);
  });

  it("retrieves the comments on an game or achievement", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetCommentsResponse = {
      Count: 2,
      Total: 2,
      Results: [
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 1",
        },
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 2",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetComments.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getComments(authorization, {
      identifier: 321_865,
    });

    // ASSERT
    const expectedResponse: Comments = {
      count: 2,
      total: 2,
      results: [
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 1",
        },
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 2",
        },
      ],
    };

    expect(response).toEqual(expectedResponse);
  });

  it("retrieves the comments on an game or achievement, respecting count", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetCommentsResponse = {
      Count: 2,
      Total: 4,
      Results: [
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 1",
        },
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 2",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetComments.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getComments(authorization, {
      identifier: 321_865,
      count: 2,
    });

    // ASSERT
    const expectedResponse: Comments = {
      count: 2,
      total: 4,
      results: [
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 1",
        },
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 2",
        },
      ],
    };

    expect(response).toEqual(expectedResponse);
  });

  it("retrieves the comments on an game or achievement, respecting offset", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetCommentsResponse = {
      Count: 1,
      Total: 2,
      Results: [
        {
          User: "PlayTester",
          Submitted: "2024-07-31T11:22:23.000000Z",
          CommentText: "Comment 2",
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetComments.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getComments(authorization, {
      identifier: 321_865,
      offset: 1,
    });

    // ASSERT
    const expectedResponse: Comments = {
      count: 1,
      total: 2,
      results: [
        {
          user: "PlayTester",
          submitted: "2024-07-31T11:22:23.000000Z",
          commentText: "Comment 2",
        },
      ],
    };

    expect(response).toEqual(expectedResponse);
  });
});
