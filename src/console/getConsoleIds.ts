import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { ConsoleId, GetConsoleIdsResponse } from "./models";

/**
 * A call to this function will retrieve the complete list
 * of console ID and name pairs on the RetroAchievements.org
 * platform.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @example
 * ```
 * const consoleIds = await getConsoleIds(authorization);
 * ```
 *
 * @returns An array containing a complete list of console ID
 * and name pairs for RetroAchievements.org.
 * ```json
 * {
 *   id: "1",
 *   name: "Mega Drive",
 *   iconUrl: "https://static.retroachievements.org/assets/images/system/md.png"
 * }
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

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["ID"],
  });
};
