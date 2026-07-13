import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetUserSetRequestsResponse,
  RequestListType,
  UserSetRequests,
} from "./models";

/**
 * A call to this function will retrieve a given user's set requests.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the set requests
 * for.
 *
 * @param payload.requestListType An optional parameter to filter set requests
 * by their current status. If omitted, the API will return only active
 * requests.
 *
 * @example
 * ```
 * const userSetRequests = await getUserSetRequests(authorization, {
 *   username: "ExampleUser"
 * });
 * ```
 *
 * @returns An object containing a list of requested sets that the
 * given user made.
 * ```json
 * {
 *   "requestedSets": [
 *     {
 *       "gameId": 8149,
 *       "title": "Example Set 1",
 *       "consoleId": 0,
 *       "consoleName": "Example Console",
 *       "imageIcon": "/Images/000001.png"
 *     },
 *     {
 *       "gameId": 9001,
 *       "title": "Example Set 2",
 *       "consoleId": 2,
 *       "consoleName": "Example Console 2",
 *       "imageIcon": "/Images/000002.png"
 *     }
 *   ],
 *   "totalRequests": 5,
 *   "pointsForNext": 5000
 * }
 * ```
 *
 * @throws If the API was given invalid parameters (422) or if the
 * API is currently down (503).
 */
export const getUserSetRequests = async (
  authorization: AuthObject,
  payload: { username: string; requestListType?: RequestListType }
): Promise<UserSetRequests> => {
  const queryParams: Record<string, number | string> = {};
  queryParams.u = payload.username;
  if (
    payload.requestListType !== null &&
    payload.requestListType !== undefined
  ) {
    queryParams.t = payload.requestListType;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserSetRequests.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUserSetRequestsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "GameID",
      "ConsoleID",
      "TotalRequests",
      "PointsForNext",
    ],
  });
};
