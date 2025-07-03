import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { ApiAuthorization } from "../utils/public";
import type { GetSetClaimsResponse, SetClaim } from "./models";

type ClaimKind = "completed" | "dropped" | "expired";

/**
 * A call to this function will retrieve a list of achievement set claims.
 *
 * @param authorization Your web API key retrieved from retroachievements.org/settings.
 *
 * @param payload.claimKind The specific kind of claims you'd like to retrieve a list of.
 *
 * @example
 * ```
 * const claims = await getClaims(
 *   authorization,
 *   { claimKind: "completed" }
 * );
 * ```
 *
 * @returns An array containing all the specified claims.
 */
export const getClaims = async (
  authorization: ApiAuthorization,
  payload: { claimKind: ClaimKind }
): Promise<SetClaim[]> => {
  const { claimKind } = payload;

  const url = buildRequestUrl(apiBaseUrl, "/API_GetClaims.php", authorization, {
    k: claimKindValueMap[claimKind],
  });

  const rawResponse = await call<GetSetClaimsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldMapToBooleans: ["UserIsJrDev"],
  });
};

const claimKindValueMap: Record<ClaimKind, `${number}`> = {
  completed: "1",
  dropped: "2",
  expired: "3",
};
