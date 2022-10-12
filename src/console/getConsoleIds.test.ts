/* eslint-disable sonarjs/no-duplicate-string */

import { rest } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getConsoleIds } from "./getConsoleIds";
import type { GetConsoleIdsResponse } from "./models";

const server = setupServer();

describe("Function: getConsoleIds", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getConsoleIds).toBeDefined();
  });

  it("retrieves a list of console IDs and their names and cleans properties", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      userName: "mockUserName",
      webApiKey: "mockWebApiKey"
    });

    const mockResponse: GetConsoleIdsResponse = [
      { ID: "1", Name: "Mega Drive" },
      { ID: "2", Name: "Nintendo 64" },
      { ID: "3", Name: "SNES" }
    ];

    server.use(
      rest.get(`${apiBaseUrl}/API_GetConsoleIDs.php`, (_, res, ctx) =>
        res(ctx.json(mockResponse))
      )
    );

    // ACT
    const response = await getConsoleIds(authorization);

    // ASSERT
    expect(response).toEqual([
      { id: 1, name: "Mega Drive" },
      { id: 2, name: "Nintendo 64" },
      { id: 3, name: "SNES" }
    ]);
  });
});
