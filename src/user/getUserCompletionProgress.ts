import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetUserCompletionProgressResponse,
  UserCompletionProgress,
} from "./models";

/**
 * A call to this function will retrieve a given user's completion
 * progress, targeted by their username.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the progress for.
 *
 * @param payload.offset Defaults to 0. The number of entries to skip.
 *
 * @param payload.count Defaults to 100, has a max of 500.
 *
 * @example
 * ```
 * const userCompletionProgress = await getUserCompletionProgress(
 *   authorization,
 *   { username: "xelnia" }
 * );
 * ```
 *
 * @returns
 * ```
 * {
 *   "count": 100,
 *   "total": 752,
 *   "results": [
 *     {
         gameId: 11406,
         title: 'Mortal Kombat 4',
         imageIcon: '/Images/042133.png',
         consoleId: 12,
         consoleName: 'PlayStation',
         maxPossible: 131,
         numAwarded: 131,
         numAwardedHardcore: 131,
         mostRecentAwardedDate: '2022-08-07T18:24:44+00:00',
         highestAwardKind: 'mastered',
         highestAwardDate: '2022-08-07T18:24:44+00:00'
 *     }
 *   ]
 * }
 * ```
 */
export const getUserCompletionProgress = async (
  authorization: AuthObject,
  payload: { username: string; offset?: number; count?: number }
): Promise<UserCompletionProgress> => {
  const { username, offset, count } = payload;

  const params: Record<string, string | number> = {
    u: username,
  };
  if (offset) {
    params["o"] = offset;
  }
  if (count) {
    params["c"] = count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserCompletionProgress.php",
    authorization,
    params
  );

  const rawResponse = await call<GetUserCompletionProgressResponse>({ url });

  return serializeProperties(rawResponse);
};
