import type { CommonCallOptions } from "../utils/internal";
import { apiBaseUrl, buildRequestUrl, call } from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GetConsoleIdsResponse } from "./models";

/**
 * A call to this function will retrieve the complete list
 * of console ID and name pairs on the RetroAchievements.org
 * platform.
 *
 * @param authorization An object containing your userName and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param options.isPropertyCleaningEnabled Enabled by default.
 * The RetroAchievements.org API returns PascalCase'd responses
 * that often contain only string-typed values. When this option
 * is enabled, a mapping function is executed to convert keys to
 * be camelCased and cast strings to numbers and/or dates.
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
  authorization: AuthObject,
  options?: CommonCallOptions
) => {
  const isPropertyCleaningEnabled = options?.isPropertyCleaningEnabled ?? true;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetConsoleIDs.php",
    authorization
  );

  const rawResponse = await call<GetConsoleIdsResponse>({ url });

  return isPropertyCleaningEnabled ? cleanProperties(rawResponse) : rawResponse;
};

const cleanProperties = (rawResponse: GetConsoleIdsResponse) => {
  return rawResponse.map((rawEntity) => ({
    id: Number(rawEntity.ID),
    name: rawEntity.Name
  }));
};
