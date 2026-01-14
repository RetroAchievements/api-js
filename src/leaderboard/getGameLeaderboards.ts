import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GameLeaderboards, GetGameLeaderboardsResponse } from "./models";

/**
 * A call to this function will retrieve a list of leaderboards for a
 * given game ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The ID of the game to retrieve leaderboards for.
 *
 * @param payload.offset The number of entries to skip. The API will default
 * to 0 if the parameter is not specified.
 *
 * @param payload.count The number of entries to return. The API will
 * default to 100 if the parameter is not specified. The max number
 * of entries that can be returned is 500.
 *
 * @example
 * ```
 * const gameLeaderboards = await getGameLeaderboards(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing a list of leaderboards that were created
 * for the specified game.
 * ```json
 * {
 *   "count": 1,
 *   "total": 1,
 *   "results": [
 *     {
 *       "id": 1234,
 *       "rankAsc": false,
 *       "title": "South Island Conqueror",
 *       "description": "Complete the game with the highest score possible.",
 *       "format": "VALUE",
 *       "author": "Example",
 *       "authorUlid": "0123456789ABCDEFGHIJKLMNO",
 *       "state": "active",
 *       "topEntry" : {
 *         "user": "TopExample",
 *         "ulid": "ONMLKJIHGFEDCBA9876543210",
 *         "score": 98765,
 *         "formattedScore": "98,765"
 *       }
 *     }
 *   ]
 * }
 * ```
 *
 * @throws If the API was given invalid parameters (422) or if the
 * API is currently down (503).
 */
export const getGameLeaderboards = async (
  authorization: AuthObject,
  payload: { gameId: ID; offset?: number; count?: number }
): Promise<GameLeaderboards> => {
  const queryParams: Record<string, string | number> = {};
  queryParams.i = payload.gameId;
  if (payload.offset !== null && payload.offset !== undefined) {
    queryParams.o = payload.offset;
  }
  if (payload.count !== null && payload.count !== undefined) {
    queryParams.c = payload.count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameLeaderboards.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetGameLeaderboardsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["ID", "Score"],
    shouldMapToBooleans: ["RankAsc"],
  });
};
