/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getCommentsOnAchievementWall } from "./getCommentsOnAchievementWall";
import type { Comments, GetCommentsResponse } from "./models";

const server = setupServer();

describe("Function: getCommentsOnAchievementWall", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getCommentsOnAchievementWall).toBeDefined();
  });

  it("retrieves the comments on an achievement and cleans properties", async () => {
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
    const response = await getCommentsOnAchievementWall(authorization, {
      achievementId: 321_865,
      count: 2,
      offset: 2,
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
});
