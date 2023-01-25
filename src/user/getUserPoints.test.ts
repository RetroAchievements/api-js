import { rest } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserPoints } from "./getUserPoints";
import type { GetUserPointsResponse } from "./models";

const server = setupServer();

describe("Function: getUserPoints", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserPoints).toBeDefined();
  });

  it("given a username, retrieves the point values associated with the user", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetUserPointsResponse = {
      Points: 10_000,
      SoftcorePoints: 5400
    };

    server.use(
      rest.get(`${apiBaseUrl}/API_GetUserPoints.php`, (_, res, ctx) =>
        res(ctx.json(mockResponse))
      )
    );

    // ACT
    const response = await getUserPoints(authorization, { userName: "xelnia" });

    // ASSERT
    expect(response).toEqual({
      points: 10_000,
      softcorePoints: 5400
    });
  });
});
