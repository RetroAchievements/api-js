import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { apiBaseUrl } from "../utils/internal";
import { buildAuthorization } from "../utils/public";
import { getUserProgress } from "./getUserProgress";
import type { GetUserProgressResponse } from "./models";

const server = setupServer();

describe("Function: getUserProgress", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(getUserProgress).toBeDefined();
  });

  it(`retrieves a map of a user's progress by game IDs`, async () => {
    // ARRANGE
    const authorization = buildAuthorization({
      username: "mockUserName",
      webApiKey: "mockWebApiKey",
    });

    const mockResponse: GetUserProgressResponse = {
      "1": {
        NumPossibleAchievements: "10",
        PossibleScore: "200",
        NumAchieved: "4",
        ScoreAchieved: "80",
        NumAchievedHardcore: "4",
        ScoreAchievedHardcore: "80",
      },
      "14402": {
        NumPossibleAchievements: "10",
        PossibleScore: "200",
        NumAchieved: "4",
        ScoreAchieved: "80",
        NumAchievedHardcore: "4",
        ScoreAchievedHardcore: "80",
      },
    };

    server.use(
      http.get(`${apiBaseUrl}/API_GetUserProgress.php`, () =>
        HttpResponse.json(mockResponse)
      )
    );

    // ACT
    const response = await getUserProgress(authorization, {
      username: "xelnia",
      gameIds: [1, 14_402],
    });

    // ASSERT
    expect(response).toEqual({
      "1": {
        numPossibleAchievements: 10,
        possibleScore: 200,
        numAchieved: 4,
        scoreAchieved: 80,
        numAchievedHardcore: 4,
        scoreAchievedHardcore: 80,
      },
      "14402": {
        numPossibleAchievements: 10,
        possibleScore: 200,
        numAchieved: 4,
        scoreAchieved: 80,
        numAchievedHardcore: 4,
        scoreAchievedHardcore: 80,
      },
    });
  });
});
