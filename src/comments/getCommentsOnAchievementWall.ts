import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetComments } from "./models";

/**
 * A call to this function will retrieve a list of comments on a achievement.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.achievementId The achievementId ID to get the comments for.
 *
 * @example
 * ```
 * const achievementComments = await getCommentsOnAchievementWall(
 *   authorization,
 *   { achievementId: 321865 },
 * );
 * ```
 *
 * @returns An array containing all the comments on the given achievement.
 */

export const getCommentsOnAchievementWall = async (
  authorization: AuthObject,
  payload: { achievementId: string }
): Promise<GetComments> => {
  const { achievementId } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetComments.php",
    authorization,
    { i: achievementId, t: 2 }
  );

  const rawResponse = await call<GetComments>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["Count", "Total"],
  });
};
