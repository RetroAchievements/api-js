import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  DatedUserAchievement,
  DatedUserAchievementsResponse,
} from "./models";

/**
 * A call to this function will retrieve a list of achievements
 * earned by a given user on a specified date.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the
 * list of achievements for.
 *
 * @param payload.fromDate A Date object specifying when
 * the list itself should begin.
 *
 * @param payload.onDate A Date object specifying the day
 * to query for a user's earned achievements.
 *
 * @example
 * ```
 * const achievementsEarnedOnDay = await getAchievementsEarnedOnDay(
 *   authorization,
 *   {
 *     username: "xelnia",
 *     onDate: new Date("2022-10-13")
 *   }
 * );
 * ```
 *
 * @returns An array containing metadata about the user
 * achievements earned on the specified day.
 * ```
 *  [
 *    {
 *      date: '2022-10-12 07:58:05',
 *      hardcoreMode: true,
 *      achievementId: 173315,
 *      title: 'Your Puny Human Weapons',
 *      description: 'Collect all objects in the Weapons Category.',
 *      badgeName: '193756',
 *      points: 10,
 *      author: 'blendedsea',
 *      gameTitle: 'Me & My Katamari',
 *      gameIcon: '/Images/047357.png',
 *      gameId: 3571,
 *      consoleName: 'PlayStation Portable',
 *      cumulScore: 120,
 *      badgeUrl: '/Badge/193756.png',
 *      gameUrl: '/game/3571',
 *      type: 'progression'
 *    }
 *  ]
 * ```
 */
export const getAchievementsEarnedOnDay = async (
  authorization: AuthObject,
  payload: { username: string; onDate: Date }
): Promise<DatedUserAchievement[]> => {
  const { username, onDate } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementsEarnedOnDay.php",
    authorization,
    {
      u: username,
      // YYYY-MM-DD
      d: `${onDate.getFullYear()}-${onDate.getMonth() + 1}-${onDate.getDate()}`,
    }
  );

  const rawResponse = await call<DatedUserAchievementsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["AchievementID", "Points", "GameID"],
    shouldMapToBooleans: ["HardcoreMode"],
  });
};
