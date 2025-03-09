import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";

import { GetComments } from "./models";

/**
 * A call to this function will retrieve a list of
 * comments on a identifier. This can be a gameId, userId, or achievementId
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the historical
 * comments of (their wall).
 *
 * @param payload.identifier The ID or username of the object in question.
 *
 * @param payload.type What type of object you're requesting. Needed if you
 * are requesting a game (1) or achievement (2), since the IDs may overlap.
 *
 * @example
 * ```
 * const comments = await getComments(
 *   authorization,
 *   { username: "Jamiras" },
 * );
 * ```
 *
 * @returns An array containing all the achievement set claims
 * made over the lifetime of the given user.
 */

export const getCommentsOnUserWall = async (
  authorization: AuthObject,
  payload: { username: string },
): Promise<GetComments> => {
  const { username } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetComments.php",
    authorization,
    { i: username },
  );

  const rawResponse = await call<GetComments>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["Count", "Total"],
  });
};
