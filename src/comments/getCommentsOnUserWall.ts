import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetComments } from "./models";

/**
 * A call to this function will retrieve a list of comments on a user's wall.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The username to get the comments wall for.
 *
 * @example
 * ```
 * const userWallComments = await getCommentsOnUserWall(
 *   authorization,
 *   { username: "xelnia", count: 4, offset: 0  },
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
export const getCommentsOnUserWall = async (
  authorization: AuthObject,
  payload: { username: string; offset?: number; count?: number }
): Promise<GetComments> => {
  const { username, offset, count } = payload;

  const queryParams: Record<string, number | string> = { i: username };

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

  const rawResponse = await call<GetComments>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["Count", "Total"],
  });
};
