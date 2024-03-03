import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetSetClaimsResponse, SetClaim } from "./models";

type ClaimKind = "completed" | "dropped" | "expired";

export const getClaims = async (
  authorization: AuthObject,
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
