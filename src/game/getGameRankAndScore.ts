import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { ApiAuthorization } from "../utils/public";
import type {
  GameRankAndScoreEntity,
  GetGameRankAndScoreResponse,
} from "./models";

/**
 * A call to this function will retrieve metadata about
 * either the latest masters for a game, or the highest
 * points earners for a game. The game is targeted via
 * its unique ID.
 *
 * @param authorization Your web API key retrieved from retroachievements.org/settings.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @param payload.type Can either be "latest-masters" or "high-scores".
 *
 * @example
 * ```
 * const gameRankAndScore = await getGameRankAndScore(
 *   authorization,
 *   { gameId: 14402, type: "latest-masters" }
 * );
 * ```
 *
 * @returns An array containing a list of latest masters or
 * high score earners for a given game ID.
 * ```json
 * [
 *   {  user: 'Arekdias', totalScore: 189, lastAward: '2020-10-10 22:43:32' }
 * ]
 * ```
 */
export const getGameRankAndScore = async (
  authorization: ApiAuthorization,
  payload: { gameId: ID; type: "latest-masters" | "high-scores" }
): Promise<GameRankAndScoreEntity[]> => {
  const { gameId, type } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameRankAndScore.php",
    authorization,
    {
      g: gameId,
      t: type === "latest-masters" ? 1 : 0,
    }
  );

  const rawResponse = await call<GetGameRankAndScoreResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["TotalScore"],
  });
};
