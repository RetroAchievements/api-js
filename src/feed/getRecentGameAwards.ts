import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject, AwardKind } from "../utils/public";
import type { GetRecentGameAwardsResponse, RecentGameAwards } from "./models";

/**
 * A call to this function will retrieve all recently granted game
 * awards across the site's userbase.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.startDate The date to fetch awards from.
 *
 * @param payload.offset Optional. Defaults to 0.
 *
 * @param payload.count Optional. Defaults to 25.
 *
 * @param payload.desiredAwardKinds Optional. Defaults to all. Accepts "beaten-softcore", "beaten-hardcore", "completed", and/or "mastered".
 *
 * @example
 * ```
 * const recentGameAwards = await getRecentGameAwards(
 *   authorization,
 * );
 * ```
 *
 * @returns An object containing metadata about all recently granted game
 * awards across the site's userbase
 * ```
 * {
 *   count: 1,
 *   total: 1,
 *   results: [
 *     {
 *       user: "renanbrj",
 *       awardKind: "mastered",
 *       awardDate: "2022-01-01T23:48:04+00:00",
 *       gameId: 14_284,
 *       gameTitle: "Batman Returns",
 *       consoleId: 15,
 *       consoleName: "Game Gear",
 *     },
 *   ],
 * }
 * ```
 */
export const getRecentGameAwards = async (
  authorization: AuthObject,
  payload?: Partial<{
    startDate: string;
    offset: number;
    count: number;
    desiredAwardKinds: AwardKind[];
  }>
): Promise<RecentGameAwards> => {
  const queryParams: Record<string, any> = {};
  if (payload?.startDate) {
    queryParams.d = payload.startDate;
  }
  if (payload?.offset) {
    queryParams.o = payload.offset;
  }
  if (payload?.count) {
    queryParams.c = payload.count;
  }
  if (payload?.desiredAwardKinds) {
    queryParams.k = payload.desiredAwardKinds.join(",");
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetRecentGameAwards.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetRecentGameAwardsResponse>({ url });

  return serializeProperties(rawResponse);
};
