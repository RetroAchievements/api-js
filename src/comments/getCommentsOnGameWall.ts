import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { Comments, GetCommentsResponse } from "./models";

/**
 * A call to this function will retrieve a list of comments on a game's page.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The gameId ID to get the comments for.
 *
 * @param payload.offset Defaults to 0. The number of entries to skip.
 *
 * @param payload.count Defaults to 50, has a max of 500.
 *
 * @example
 * ```
 * const gameWallComments = await getCommentsOnGameWall(
 *   authorization,
 *   { gameId: 20294, count: 4, offset: 0 },
 * );
 * ```
 *
 * @returns An object containing the amount of comments retrieved,
 * the total comments, and an array of the comments themselves.
 * ```
 * {
 *   count: 4,
 *   total: 4,
 *   results: [
 *   {
 *     user: "PlayTester",
 *     submitted: "2024-07-31T11:22:23.000000Z",
 *     commentText: "Comment 1"
 *   },
 *   // ...
 *   ]
 * }
 * ```
 */
export const getCommentsOnGameWall = async (
  authorization: AuthObject,
  payload: { gameId: ID; offset?: number; count?: number }
): Promise<Comments> => {
  const { gameId, offset, count } = payload;

  const queryParams: Record<string, number | string> = { i: gameId, t: 1 };

  if (offset) {
    queryParams.o = offset;
  }

  if (count) {
    queryParams.c = count;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetComments.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetCommentsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["Count", "Total"],
  });
};
