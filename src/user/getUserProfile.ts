import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetUserProfileResponse, UserProfile } from "./models";

/**
 * A call to this function will retrieve summary information about
 * a given user, targeted by username.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the summary for.
 *
 * @example
 * ```
 * const userSummary = await getUserProfile(
 *   authorization,
 *   { username: "xelnia" }
 * );
 * ```
 *
 * @returns An object containing profile summary metadata about a target user.
 */
export const getUserProfile = async (
  authorization: AuthObject,
  payload: {
    username: string;
  }
): Promise<UserProfile> => {
  const { username } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserProfile.php",
    authorization,
    { u: username }
  );

  const rawResponse = await call<GetUserProfileResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "TotalPoints",
      "TotalSoftcorePoints",
      "TotalTruePoints",
      "Permissions",
    ],
    shouldMapToBooleans: ["Untracked", "UserWallActive"],
  });
};
