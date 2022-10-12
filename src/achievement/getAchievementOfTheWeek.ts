import { apiBaseUrl, buildRequestUrl, call } from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  AchievementOfTheWeek,
  GetAchievementOfTheWeekResponse
} from "./models";

/**
 * A call to this function will retrieve comprehensive
 * metadata about the current Achievement of the Week.
 *
 * @param authorization An object containing your userName and webApiKey.
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
 *     dateModified: "2021-08-09 12:20:05"
 *   },
 *   console: { id: "39", title: "Saturn" },
 *   forumTopic: { id: "14767" },
 *   game: { id: "14513", title: "Guardian Heroes" },
 *   startAt: "2022-10-10 00:00:00",
 *   totalPlayers: "219",
 *   unlocks: [
 *     {
 *       user: "Tirbaba2",
 *       rAPoints: "72",
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

  return cleanProperties(rawResponse);
};

const cleanProperties = (
  rawResponse: GetAchievementOfTheWeekResponse
): AchievementOfTheWeek => {
  return {
    achievement: {
      id: Number(rawResponse.Achievement.ID),
      title: rawResponse.Achievement.Title,
      description: rawResponse.Achievement.Description,
      points: Number(rawResponse.Achievement.Points),
      trueRatio: Number(rawResponse.Achievement.TrueRatio),
      author: rawResponse.Achievement.Author,
      dateCreated: rawResponse.Achievement.DateCreated,
      dateModified: rawResponse.Achievement.DateModified
    },
    console: {
      id: Number(rawResponse.Console.ID),
      title: rawResponse.Console.Title
    },
    forumTopic: {
      id: Number(rawResponse.ForumTopic.ID)
    },
    game: {
      id: Number(rawResponse.Game.ID),
      title: rawResponse.Game.Title
    },
    startAt: rawResponse.StartAt,
    totalPlayers: Number(rawResponse.TotalPlayers),
    unlocks: rawResponse.Unlocks.map((rawUnlock) => ({
      user: rawUnlock.User,
      raPoints: Number(rawUnlock.RAPoints),
      dateAwarded: rawUnlock.DateAwarded,
      hardcoreMode: rawUnlock.HardcoreMode === "1" ? true : false
    })),
    unlocksCount: Number(rawResponse.UnlocksCount)
  };
};
