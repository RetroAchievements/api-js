/* eslint-disable sonarjs/no-duplicate-string */

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getGameHashes } from "./getGameHashes";
import type { GetGameHashesResponse } from "./models";

const server = setupServer();

describe("Function: getGameHashes", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getGameHashes).toBeDefined();
  });

  it("given a game ID, retrieves a list of linked hashes", async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetGameHashesResponse = {
      Results: [
        {
          Name: "Sonic The Hedgehog (USA, Europe) (Ru) (NewGame).md",
          MD5: "1b1d9ac862c387367e904036114c4825",
          Labels: ["nointro", "rapatches"],
          PatchUrl:
            "https://github.com/RetroAchievements/RAPatches/raw/main/MD/Translation/Russian/1-Sonic1-Russian.zip",
        },
        {
          Name: "Sonic The Hedgehog (USA, Europe).md",
          MD5: "1bc674be034e43c96b86487ac69d9293",
          Labels: ["nointro"],
          PatchUrl: null,
        },
      ],
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetGameHashes.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getGameHashes(authorization, { gameId: 1 });

    // ASSERT
    expect(response).toEqual({
      results: [
        {
          name: "Sonic The Hedgehog (USA, Europe) (Ru) (NewGame).md",
          md5: "1b1d9ac862c387367e904036114c4825",
          labels: ["nointro", "rapatches"],
          patchUrl:
            "https://github.com/RetroAchievements/RAPatches/raw/main/MD/Translation/Russian/1-Sonic1-Russian.zip",
        },
        {
          name: "Sonic The Hedgehog (USA, Europe).md",
          md5: "1bc674be034e43c96b86487ac69d9293",
          labels: ["nointro"],
          patchUrl: null,
        },
      ],
    });
  });
});
