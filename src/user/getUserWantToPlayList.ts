import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetUserWantToPlayListResponse,
  UserWantToPlayList,
} from "./models";

/**
 * A call to this function will retrieve a user's "Want to Play Games" list.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the
 * want to play games list for.
 *
 * @param payload.offset Defaults to 0. The number of entries to skip.
 *
 * @param payload.count Defaults to 100, has a max of 500.
 *
 * @example
 * ```
 * const wantToPlayList = await getUserWantToPlayList(
 *   authorization,
 *   { username: "wv_pinball" }
 * );
 * ```
 *
 * @returns An object containing a user's list of "Want to Play Games".
 * ```json
 * {
 *   "count": 100,
 *   "total": 1287,
 *   "results": [
 *     {
 *       "id": 20246,
 *       "title": "~Hack~ Knuckles the Echidna in Sonic the Hedgehog",
 *       "imageIcon": "/Images/074560.png",
 *       "consoleID": 1,
 *       "consoleName": "Genesis/Mega Drive",
 *       "pointsTotal": 1500,
 *       "achievementsPublished": 50
 *     }
 *   ]
 * }
 * ```
 */
export const getUserWantToPlayList = async (
  authorization: AuthObject,
  payload: { username: string; offset?: number; count?: number }
): Promise<UserWantToPlayList> => {
  const queryParams: Record<string, any> = {};
  queryParams.u = payload.username;
  if (payload?.offset) {
    queryParams.o = payload.offset;
  }
  if (payload?.count) {
    queryParams.c = payload.count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserWantToPlayList.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUserWantToPlayListResponse>({ url });

  return serializeProperties(rawResponse);
};
