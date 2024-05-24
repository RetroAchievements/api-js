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
 * earned by a given user between two provided dates.
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
 * @param payload.toDate A Date object specifying when
 * the list itself should end.
 *
 * @example
 * ```
 * const achievementsEarnedBetween = await getAchievementsEarnedBetween(
 *   authorization,
 *   {
 *     username: "xelnia",
 *     fromDate: new Date("2022-10-12"),
 *     toDate: new Date("2022-10-13")
 *   }
 * );
 * ```
 *
 * @returns An array containing metadata about the user
 * achievements earned during the specified date range.
 * ```
 * [
 *   {
 *     date: '2022-10-12 07:58:05',
 *     hardcoreMode: true,
 *     achievementId: 173315,
 *     title: 'Your Puny Human Weapons',
 *     description: 'Collect all objects in the Weapons Category.',
 *     badgeName: '193756',
 *     points: 10,
 *     author: 'blendedsea',
 *     gameTitle: 'Me & My Katamari',
 *     gameIcon: '/Images/047357.png',
 *     gameId: 3571,
 *     consoleName: 'PlayStation Portable',
 *     cumulScore: 120,
 *     badgeUrl: '/Badge/193756.png',
 *     gameUrl: '/game/3571',
 *     type: 'progression'
 *   }
 * ]
 * ```
 */
export const getAchievementsEarnedBetween = async (
  authorization: AuthObject,
  payload: { username: string; fromDate: Date; toDate: Date }
): Promise<DatedUserAchievement[]> => {
  const { username, fromDate, toDate } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementsEarnedBetween.php",
    authorization,
    {
      u: username,
      f: (fromDate.getTime() / 1000).toFixed(0),
      t: (toDate.getTime() / 1000).toFixed(0),
    }
  );

  const rawResponse = await call<DatedUserAchievementsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["AchievementID", "Points", "GameID"],
    shouldMapToBooleans: ["HardcoreMode"],
  });
};
