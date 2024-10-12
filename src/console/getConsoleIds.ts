import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { ApiAuthorization } from "../utils/public";
import type { FetchedSystem, GetConsoleIdsResponse } from "./models";

/**
 * A call to this function will retrieve the complete list
 * of console ID and name pairs on the RetroAchievements.org
 * platform.
 *
 * @param authorization Your web API key retrieved from retroachievements.org/settings.
 *
 * @param payload.shouldOnlyRetrieveActiveSystems If true, only systems that
 * officially support achievements will be returned.
 *
 * @param payload.shouldOnlyRetrieveGameSystems If true, events and hubs will
 * not be returned.
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
 *   iconUrl: "https://static.retroachievements.org/assets/images/system/md.png",
 *   active: true,
 *   isGameSystem: true
 * }
 * ```
 */
export const getConsoleIds = async (
  authorization: ApiAuthorization,
  payload?: {
    shouldOnlyRetrieveActiveSystems: boolean;
    shouldOnlyRetrieveGameSystems: boolean;
  }
): Promise<FetchedSystem[]> => {
  let callPayload: Record<string, any> | undefined;

  if (payload?.shouldOnlyRetrieveActiveSystems) {
    callPayload = { ...callPayload, a: 1 };
  }
  if (payload?.shouldOnlyRetrieveGameSystems) {
    callPayload = { ...callPayload, g: 1 };
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetConsoleIDs.php",
    authorization,
    callPayload
  );

  const rawResponse = await call<GetConsoleIdsResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["ID"],
  });
};
