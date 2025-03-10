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
 * A call to this function will retrieve a list of comments on a particular target.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.identifier The identifier to retrieve. For user walls, this will
 * be a string (the username), and for game and achievement walls, this will be a
 * the ID of the object in question.
 *
 * @param payload.offset Defaults to 0. The number of entries to skip.
 *
 * @param payload.count Defaults to 50, has a max of 500.
 *
 * @example
 * ```
 * // Retrieving game/achievement comments
 * const gameWallComments = await getComments(
 *   authorization,
 *   { identifier: 20294, count: 4, offset: 0 },
 * );
 *
 * // Retrieving comments on a user's wall
 * const userWallComments = await getComments(
 *   authorization,
 *   { identifier: "xelnia", count: 4, offset: 0 },
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
export const getComments = async (
  authorization: AuthObject,
  payload: { identifier: ID | string; offset?: number; count?: number }
): Promise<Comments> => {
  const { identifier, offset, count } = payload;

  const queryParams: Record<string, number | string> = { i: identifier, t: 1 };

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
