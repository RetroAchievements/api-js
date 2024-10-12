import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { ApiAuthorization } from "../utils/public";
import type { GetUserPointsResponse, UserPoints } from "./models";

/**
 * A call to this function will retrieve a given user's hardcore
 * and softcore points.
 *
 * @param authorization Your web API key retrieved from retroachievements.org/settings.
 *
 * @param payload.username The user for which to retrieve the point totals for.
 *
 * @example
 * ```
 * const userPoints = await getUserPoints(
 *   authorization,
 *   { username: "xelnia" }
 * );
 * ```
 *
 * @returns An object containing metadata about a target user's points.
 * ```json
 * {
 *   points: 7640,
 *   softcorePoints: 25
 * }
 * ```
 */
export const getUserPoints = async (
  authorization: ApiAuthorization,
  payload: { username: string }
): Promise<UserPoints> => {
  const { username } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserPoints.php",
    authorization,
    { u: username }
  );

  const rawResponse = await call<GetUserPointsResponse>({ url });

  return serializeProperties(rawResponse);
};
