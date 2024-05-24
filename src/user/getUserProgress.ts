import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetUserProgressResponse, UserProgress } from "./models";

/**
 * A call to this function will retrieve a given user's
 * progress on a given list of games, targeted by game ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the progress for.
 *
 * @param payload.gameIds An array of RetroAchievements game IDs. If you aren't
 * sure of the game ID, visit the game's page on the website and copy the number
 * at the end of the URL.
 *
 * @example
 * ```
 * const userProgress = await getUserProgress(
 *   authorization,
 *   { username: "xelnia", gameIds: [1, 14402] }
 * );
 * ```
 *
 * @returns An object which is a map of summarized progress for games.
 * ```json
 * {
 *   "1": {
 *     numPossibleAchievements: 24,
 *     possibleScore: 255,
 *     numAchieved: 0,
 *     scoreAchieved: 0,
 *     numAchievedHardcore: 0,
 *     scoreAchievedHardcore: 0
 *   },
 *   "14402": {
 *     numPossibleAchievements: 24,
 *     possibleScore: 255,
 *     numAchieved: 0,
 *     scoreAchieved: 0,
 *     numAchievedHardcore: 0,
 *     scoreAchievedHardcore: 0
 *   }
 * }
 * ```
 */
export const getUserProgress = async (
  authorization: AuthObject,
  payload: { username: string; gameIds: ID[] }
): Promise<UserProgress> => {
  const { username, gameIds } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserProgress.php",
    authorization,
    { u: username, i: gameIds.join(",") }
  );

  const rawResponse = await call<GetUserProgressResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "NumPossibleAchievements",
      "PossibleScore",
      "NumAchieved",
      "ScoreAchieved",
      "NumAchievedHardcore",
      "ScoreAchievedHardcore",
    ],
  });
};
