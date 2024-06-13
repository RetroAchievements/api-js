import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  AchievementOfTheWeek,
  GetAchievementOfTheWeekResponse,
} from "./models";

/**
 * A call to this function will retrieve comprehensive
 * metadata about the current Achievement of the Week.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @example
 * ```
 * const achievementOfTheWeek = await getAchievementOfTheWeek(
 *   authorization
 * );
 * ```
 *
 * @returns An object containing comprehensive metadata
 * about the current Achievement of the Week.
 * ```
 * {
 *   achievement: {
 *     id: "165062",
 *     title: "The True Hero",
 *     description: "Receive any Ending as Han [Normal or Hard]",
 *     points: "10",
 *     trueRatio: "22",
 *     author: "BigWeedSmokerMan",
 *     dateCreated: "2021-08-08 17:47:46",
 *     dateModified: "2021-08-09 12:20:05",
 *     badgeName: "185805",
 *     badgeUrl: "/Badge/185805.png"
 *   },
 *   console: { id: "39", title: "Saturn" },
 *   forumTopic: { id: "14767" },
 *   game: { id: "14513", title: "Guardian Heroes" },
 *   startAt: "2022-10-10 00:00:00",
 *   totalPlayers: "219",
 *   unlocks: [
 *     {
 *       user: "Tirbaba2",
 *       raPoints: "72",
 *       raSoftcorePoints: "72",
 *       dateAwarded: "2022-10-10 01:42:19",
 *       hardcoreMode: "1"
 *     }
 *   ],
 *   unlocksCount: "40"
 * }
 * ```
 */
export const getAchievementOfTheWeek = async (
  authorization: AuthObject
): Promise<AchievementOfTheWeek> => {
  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetAchievementOfTheWeek.php",
    authorization
  );

  const rawResponse = await call<GetAchievementOfTheWeekResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "ID",
      "Points",
      "TrueRatio",
      "TotalPlayers",
      "RAPoints",
      "RASoftcorePoints",
      "UnlocksCount",
    ],
    shouldMapToBooleans: ["HardcoreMode"],
  });
};
