import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GameExtended, GetGameExtendedResponse } from "./models";

/**
 * A call to this function will retrieve extended metadata
 * about a game, targeted via its unique ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @example
 * ```
 * const gameExtended = await getGameExtended(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing extended metadata about a target game.
 * ```json
 * {
 *   id: 14402,
 *   title: "Dragster",
 *   consoleId: 25,
 *   forumTopicId: 9145,
 *   flags: 0,
 *   imageIcon: "/Images/026368.png",
 *   imageTitle: "/Images/026366.png",
 *   imageIngame: "/Images/026367.png",
 *   imageBoxArt: "/Images/026365.png",
 *   publisher: "Activision",
 *   developer: "David Crane",
 *   genre: "Racing",
 *   released: "1980",
 *   isFinal: false,
 *   consoleName: "Atari 2600",
 *   richPresencePatch: "2b92fa1bf9635c303b3b7f8feea3ed3c",
 *   numAchievements: 12,
 *   numDistinctPlayersCasual: 454,
 *   numDistinctPlayersHardcore: 323,
 *   claims: [],
 *   achievements: {
 *     '79434': {
 *       id: 79434,
 *       numAwarded: 338,
 *       numAwardedHardcore: 253,
 *       title: "Novice Dragster Driver 1",
 *       description: "Complete your very first race in game 1.",
 *       points: 1,
 *       trueRatio: 1,
 *       author: "Boldewin",
 *       dateModified: "2019-08-01 19:03:46",
 *       dateCreated: "2019-07-31 18:49:57",
 *       badgeName: "85541",
 *       displayOrder: 0,
 *       memAddr: "f5c41fa0b5fa0d5fbb8a74c598f18582"
 *     }
 *   }
 * }
 * ```
 */
export const getGameExtended = async (
  authorization: AuthObject,
  payload: { gameId: ID; isRequestingUnofficialAchievements?: boolean }
): Promise<GameExtended> => {
  const { gameId, isRequestingUnofficialAchievements } = payload;

  const params: Record<string, string | number> = {
    i: gameId,
  };

  if (isRequestingUnofficialAchievements) {
    params["f"] = 5;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameExtended.php",
    authorization,
    params
  );

  const rawResponse = await call<GetGameExtendedResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "ID",
      "NumAwarded",
      "NumAwardedHardcore",
      "Points",
      "TrueRatio",
      "DisplayOrder",
      "NumDistinctPlayersCasual",
      "NumDistinctPlayersHardcore",
    ],
  });
};
