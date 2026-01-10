import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetUserGameLeaderboardsResponse,
  UserGameLeaderboards,
} from "./models";

/**
 * A call to this endpoint will retrieve a user's list of leaderboards for a given game, targeted by the game's ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The target game ID.
 *
 * @param payload.offset Defaults to 0. The number of entries to skip.
 *
 * @param payload.count Defaults to 100, has a max of 500.
 *
 * @example
 * ```
 * const gameLeaderboards = await getUserGameLeaderboards(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing user game leaderboard's.
 * ```json
 * {
 *   "count": 10,
 *   "total": 64,
 *   "results": [
 *     {
 *       "id": 19062,
 *       "rankAsc": true,
 *       "title": "New Zealand One",
 *       "description": "Complete New Zealand S1 in least time",
 *       "format": "MILLISECS",
 *       "userEntry": {
 *         "user": "zuliman92",
 *         "ulid": "00003EMFWR7XB8SDPEHB3K56ZQ",
 *         "score": 12620,
 *         "formattedScore": "2:06.20",
 *         "rank": 2,
 *         "dateUpdated": "2024-12-12T16:40:59+00:00"
 *       }
 *     }
 *   ]
 * }
 * ```
 */
export const getUserGameLeaderboards = async (
  authorization: AuthObject,
  payload: { gameId: ID; username: string; offset?: number; count?: number }
): Promise<UserGameLeaderboards> => {
  const queryParams: Record<string, any> = {};
  queryParams.i = payload.gameId;
  queryParams.u = payload.username;
  if (payload?.offset) {
    queryParams.o = payload.offset;
  }
  if (payload?.count) {
    queryParams.c = payload.count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserGameLeaderboards.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUserGameLeaderboardsResponse>({ url });

  return serializeProperties(rawResponse);
};
