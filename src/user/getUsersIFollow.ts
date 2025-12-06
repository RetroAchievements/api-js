import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetUsersIFollowResponse, UsersIFollow } from "./models";

/**
 * A call to this function will retrieve the list of users that the
 * caller is following.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
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
 * const usersIFollow = await getUsersIFollow(authorization);
 * ```
 *
 * @returns An object containing a list of users that the caller is
 * following.
 * ```json
 * {
 *   "count": 1,
 *   "total": 1,
 *   "results": [
 *     {
 *       "user": "Example",
 *       "ulid": "0123456789ABCDEFGHIJKLMNO",
 *       "points": 9001,
 *       "pointsSoftcore": 101,
 *       "isFollowingMe": false
 *     }
 *   ]
 * }
 * ```
 *
 * @throws If the API was given invalid parameters (422) or if the
 * API is currently down (503).
 */
export const getUsersIFollow = async (
  authorization: AuthObject,
  payload?: { offset?: number; count?: number }
): Promise<UsersIFollow> => {
  const queryParams: Record<string, number> = {};
  if (payload?.offset !== null && payload?.offset !== undefined) {
    queryParams.o = payload.offset;
  }
  if (payload?.count !== null && payload?.count !== undefined) {
    queryParams.c = payload.count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUsersIFollow.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUsersIFollowResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["Points", "PointsSoftcore"],
    shouldMapToBooleans: ["AmIFollowing"],
  });
};
