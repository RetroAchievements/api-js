import { apiBaseUrl, buildRequestUrl, call } from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { ConsoleId, GetConsoleIdsResponse } from "./models";

/**
 * A call to this function will retrieve the complete list
 * of console ID and name pairs on the RetroAchievements.org
 * platform.
 *
 * @param authorization An object containing your userName and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @example
 * ```
 * const consoleIds = await getConsoleIds(authorization);
 * ```
 *
 * @returns An array containing a complete list of console ID
 * and name pairs for RetroAchievements.org.
 * ```
 * { id: "1", name: "Mega Drive" }
 * ```
 */
export const getConsoleIds = async (
  authorization: AuthObject
): Promise<ConsoleId[]> => {
  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetConsoleIDs.php",
    authorization
  );

  const rawResponse = await call<GetConsoleIdsResponse>({ url });

  return cleanProperties(rawResponse);
};

const cleanProperties = (rawResponse: GetConsoleIdsResponse): ConsoleId[] => {
  return rawResponse.map((rawEntity) => ({
    id: Number(rawEntity.ID),
    name: rawEntity.Name
  }));
};
