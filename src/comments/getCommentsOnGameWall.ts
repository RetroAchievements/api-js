import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetComments } from "./models";

/**
 * A call to this function will retrieve a list of comments on a game's page.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The gameId ID to get the comments for.
 *
 * @example
 * ```
 * const userWallComments = await getCommentsOnUserWall(
 *   authorization,
 *   { gameId: 20294 },
 * );
 * ```
 *
 * @returns An array containing all the comments on the game's page.
 */

export const getCommentsOnGameWall = async (
  authorization: AuthObject,
  payload: { gameId: number }
): Promise<GetComments> => {
  const { gameId } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetComments.php",
    authorization,
    { i: gameId, t: 1 }
  );

  const rawResponse = await call<GetComments>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["Count", "Total"],
  });
};
