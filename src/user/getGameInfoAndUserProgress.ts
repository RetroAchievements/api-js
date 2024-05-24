import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GameInfoAndUserProgress,
  GetGameInfoAndUserProgressResponse,
} from "./models";

/**
 * A call to this function will retrieve extended metadata
 * about a game, in addition to a user's progress about a game.
 * This is targeted via a game's unique ID and a given username.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @param payload.username The user for which to retrieve the
 * game progress for.
 *
 * @param payload.shouldIncludeHighestAwardMetadata Include a "HighestAwardKind"
 * and a "HighestAwardDate" for the given user and game ID.
 *
 * @example
 * ```
 * const gameInfoAndUserProgress = await getGameInfoAndUserProgress(
 *   authorization,
 *   { gameId: 14402, username: "wv_pinball" }
 * );
 * ```
 *
 * @returns An object containing extended metadata about a target game,
 * with attached progress for a target username.
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
 *   numDistinctPlayersHardcore, 323
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
 *       memAddr: "f5c41fa0b5fa0d5fbb8a74c598f18582",
 *       dateEarned: '2022-08-23 22:56:38',
 *       dateEarnedHardcore: '2022-08-23 22:56:38'
 *     }
 *   },
 *   numAwardedToUser: 12,
 *   numAwardedToUserHardcore: 12,
 *   userCompletion: "100.00%",
 *   userCompletionHardcore: "100.00%"
 * }
 * ```
 */
export const getGameInfoAndUserProgress = async (
  authorization: AuthObject,
  payload: {
    gameId: ID;
    username: string;
    shouldIncludeHighestAwardMetadata?: boolean;
  }
): Promise<GameInfoAndUserProgress> => {
  const { gameId, username, shouldIncludeHighestAwardMetadata } = payload;

  const params: Record<string, any> = {
    g: gameId,
    u: username,
  };
  if (shouldIncludeHighestAwardMetadata) {
    params.a = 1;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameInfoAndUserProgress.php",
    authorization,
    params
  );

  const rawResponse = await call<GetGameInfoAndUserProgressResponse>({ url });

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
