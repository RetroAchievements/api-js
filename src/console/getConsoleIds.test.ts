/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getConsoleIds } from "./getConsoleIds";
import type { ConsoleId, GetConsoleIdsResponse } from "./models";

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
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetConsoleIdsResponse = [
      {
        ID: "1",
        Name: "Mega Drive",
        IconURL:
          "https://static.retroachievements.org/assets/images/system/md.png",
      },
      {
        ID: "2",
        Name: "Nintendo 64",
        IconURL:
          "https://static.retroachievements.org/assets/images/system/n64.png",
      },
      {
        ID: "3",
        Name: "SNES",
        IconURL:
          "https://static.retroachievements.org/assets/images/system/snes.png",
      },
    ];

    server.use(
      http.get(`${apiBaseUrl}/API_GetConsoleIDs.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getConsoleIds(authorization);

    // ASSERT
    const expectedResponse: ConsoleId[] = [
      {
        id: 1,
        name: "Mega Drive",
        iconUrl:
          "https://static.retroachievements.org/assets/images/system/md.png",
      },
      {
        id: 2,
        name: "Nintendo 64",
        iconUrl:
          "https://static.retroachievements.org/assets/images/system/n64.png",
      },
      {
        id: 3,
        name: "SNES",
        iconUrl:
          "https://static.retroachievements.org/assets/images/system/snes.png",
      },
    ];

    expect(response).toEqual(expectedResponse);
  });
});
