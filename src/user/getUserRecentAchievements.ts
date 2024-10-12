import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { ApiAuthorization } from "../utils/public";
import type {
  GetUserRecentAchievementsResponse,
  UserRecentAchievement,
} from "./models";

/**
 * A call to this function will retrieve a list of a target user's
 * recently earned achievements, via their username. By default, it
 * fetches achievements earned in the last hour.
 *
 * @param authorization Your web API key retrieved from retroachievements.org/settings.
 *
 * @param payload.username The user for which to retrieve the recent achievements for.
 *
 * @param payload.recentMinutes Optional. Defaults to 60. How many minutes
 * back to fetch for the given user.
 *
 * @example
 * ```
 * const userRecentAchievements = await getUserRecentAchievements(
 *   authorization,
 *   { username: "xelnia" }
 * );
 * ```
 *
 * @returns An array containing metadata about a user's recently earned achievements.
 * ```json
 * [
 *   {
 *     date: '2023-05-23 22:32:24',
 *     hardcoreMode: true,
 *     achievementId: 51214,
 *     title: "You're a special Champ!",
 *     description: 'Win the Tournament as [You] on Hard with 1 attribute on max. and 1 attribute on min.',
 *     badgeName: '121991',
 *     points: 25,
 *     author: 'Som1',
 *     gameTitle: 'WWF King of the Ring',
 *     gameIcon: '/Images/062599.png',
 *     gameId: 6316,
 *     consoleName: 'Game Boy',
 *     badgeUrl: '/Badge/121991.png',
 *     gameUrl: '/game/6316'
 *   }
 * ]
 * ```
 */
export const getUserRecentAchievements = async (
  authorization: ApiAuthorization,
  payload: { username: string; recentMinutes?: number }
): Promise<UserRecentAchievement[]> => {
  const { username, recentMinutes } = payload;

  const queryParams: Record<string, string | number> = { u: username };

  if (recentMinutes !== undefined) {
    queryParams["m"] = recentMinutes;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserRecentAchievements.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUserRecentAchievementsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldMapToBooleans: ["HardcoreMode"],
  });
};
