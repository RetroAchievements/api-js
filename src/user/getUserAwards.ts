import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetUserAwardsResponse, UserAwards } from "./models";

/**
 * A call to this function will retrieve metadata about the target user's
 * site awards, via their username.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the site awards for.
 *
 * @example
 * ```
 * const userAwards = await getUserAwards(
 *   authorization,
 *   { username: "xelnia" }
 * )
 * ```
 *
 * @returns
 * ```json
 * {
 *   totalAwardsCount: 10,
 *   hiddenAwardsCount: 2,
 *   masteryAwardsCount: 6,
 *   completionAwardsCount: 0,
 *   beatenHardcoreAwardsCount: 24,
 *   beatenSoftcoreAwardsCount: 7,
 *   eventAwardsCount: 0,
 *   siteAwardsCount: 2,
 *   visibleUserAwards: [
 *     {
 *       awardedAt: "2022-08-26T19:34:43+00:00",
 *       awardType: "Mastery/Completion",
 *       awardData: 802,
 *       awardDataExtra: 1,
 *       displayOrder: 114,
 *       title: "WarioWare, Inc.: Mega Microgames!",
 *       consoleName: "Game Boy Advance",
 *       flags: null,
 *       imageIcon: "/Images/034678.png"
 *     }
 *   ]
 * }
 * ```
 */
export const getUserAwards = async (
  authorization: AuthObject,
  payload: { username: string }
): Promise<UserAwards> => {
  const { username } = payload;

  const queryParams: Record<string, string> = { u: username };

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserAwards.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetUserAwardsResponse>({ url });

  return serializeProperties(rawResponse);
};
