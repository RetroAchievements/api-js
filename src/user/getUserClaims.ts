import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetUserClaimsResponse, UserClaims } from "./models";

/**
 * A call to this function will retrieve a list of
 * achievement set claims made over the lifetime of a given
 * user, targeted by their username.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the historical
 * achievement set claims list for.
 *
 * @example
 * ```
 * const userClaims = await getUserClaims(
 *   authorization,
 *   { username: "Jamiras" }
 * );
 * ```
 *
 * @returns An array containing all the achievement set claims
 * made over the lifetime of the given user.
 */
export const getUserClaims = async (
  authorization: AuthObject,
  payload: { username: string }
): Promise<UserClaims> => {
  const { username } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserClaims.php",
    authorization,
    { u: username }
  );

  const rawResponse = await call<GetUserClaimsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "ID",
      "GameID",
      "ClaimType",
      "SetType",
      "Status",
      "Extension",
      "Special",
      "MinutesLeft",
    ],
  });
};
