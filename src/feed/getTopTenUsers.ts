import { apiBaseUrl, buildRequestUrl, call } from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetTopTenUsersResponse,
  TopTenUsers,
  TopTenUsersEntity
} from "./models";

/**
 * A call to this function will retrieve the current top ten users
 * on the site.
 *
 * @param authorization An object containing your userName and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @example
 * ```
 * const topTenUsers = await getTopTenUsers(authorization);
 * ```
 *
 * @returns An array containing the list of top ten users.
 * ```json
 * [
 *   { userName: "MockUser", totalPoints: 350000, totalRatioPoints: 995000 },
 *   { userName: "MockUser2", totalPoints: 345000, totalRatioPoints: 994000 },
 *   // ...
 * ]
 * ```
 */
export const getTopTenUsers = async (
  authorization: AuthObject
): Promise<TopTenUsers> => {
  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetTopTenUsers.php",
    authorization
  );

  const rawTopTenUsers = await call<GetTopTenUsersResponse>({ url });

  const sanitizedTopTenUsers: TopTenUsersEntity[] = [];
  for (const rawUser of rawTopTenUsers) {
    sanitizedTopTenUsers.push({
      userName: rawUser["1"],
      totalPoints: Number(rawUser["2"]),
      totalRatioPoints: Number(rawUser["3"])
    });
  }

  return sanitizedTopTenUsers;
};
