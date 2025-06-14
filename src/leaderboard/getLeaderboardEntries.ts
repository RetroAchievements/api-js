import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetLeaderboardEntriesResponse,
  LeaderboardEntries,
} from "./models";

/**
 * A call to this endpoint will retrieve a given leaderboard's entries, targeted by its ID.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.leaderboardId The target leaderboard ID.
 *
 * @param payload.offset Defaults to 0. The number of entries to skip.
 *
 * @param payload.count Defaults to 100, has a max of 500.
 *
 * @example
 * ```
 * const leaderboardEntries = await getLeaderboardEntries(
 *   authorization,
 *   { leaderboardId: 14402 }
 * );
 * ```
 *
 * @returns An object containing a leaderboards entries.
 * ```json
 * {
 *   "count": 100,
 *   "total": 1287,
 *   "results": [
 *     {
 *       "rank": 1,
 *       "user": "vani11a",
 *       "ulid": "00003EMFWR7XB8SDPEHB3K56ZQ",
 *       "score": 390490,
 *       "formattedScore": "390,490",
 *       "dateSubmitted": "2024-07-25T15:51:00+00:00"
 *     }
 *   ]
 * }
 * ```
 */
export const getLeaderboardEntries = async (
  authorization: AuthObject,
  payload: { leaderboardId: ID; offset?: number; count?: number }
): Promise<LeaderboardEntries> => {
  const queryParams: Record<string, any> = {};
  queryParams.i = payload.leaderboardId;
  if (payload?.offset) {
    queryParams.o = payload.offset;
  }
  if (payload?.count) {
    queryParams.c = payload.count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetLeaderboardEntries.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetLeaderboardEntriesResponse>({ url });

  return serializeProperties(rawResponse);
};
