import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GameList, GetGameListResponse } from "./models";
/**
 * A call to this function will retrieve the complete list
 * of games for a specified console on the RetroAchievements.org
 * platform.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.consoleId The unique console ID to retrieve a list of
 * games from. The list of consoleIds can be retrieved using the `getConsoleIds()`
 * function provided by this library.
 *
 * @param payload.shouldOnlyRetrieveGamesWithAchievements If truthy, will not
 * return games that do not have achievements.
 *
 * @param payload.shouldRetrieveGameHashes If truthy, will return valid
 * hashes for game ROMs in an array attached to each game in the list.
 *
 * @example
 * ```
 * const gameList = await getGameList(
 *   authorization,
 *   { consoleId: 1, shouldOnlyRetrieveGamesWithAchievements: true }
 * );
 * ```
 *
 * @returns An array containing a list of games for a given consoleId.
 * ```
 * [
 *   {
 *     title: "Elemental Master",
 *     id: 4247,
 *     consoleId: 1,
 *     consoleName: "Mega Drive",
 *     imageIcon: "/Images/048245.png",
 *     numAchievements: 44,
 *     numLeaderboards: 0,
 *     points: 500,
 *     dateModified: "2021-12-09 17:05:39",
 *     forumTopicId: 1972,
 *     hashes: ["32e1a15161ef1f070b023738353bde51"]
 *   }
 * ]
 * ```
 */
export const getGameList = async (
  authorization: AuthObject,
  payload: {
    consoleId: ID;
    shouldOnlyRetrieveGamesWithAchievements?: boolean;
    shouldRetrieveGameHashes?: boolean;
  }
): Promise<GameList> => {
  const {
    consoleId,
    shouldOnlyRetrieveGamesWithAchievements,
    shouldRetrieveGameHashes,
  } = payload;

  let callPayload: Record<string, any> = { i: consoleId };

  if (shouldOnlyRetrieveGamesWithAchievements !== undefined) {
    callPayload = {
      ...callPayload,
      f: shouldOnlyRetrieveGamesWithAchievements ? 1 : 0,
    };
  }

  if (shouldRetrieveGameHashes) {
    callPayload = { ...callPayload, h: shouldRetrieveGameHashes ? 1 : 0 };
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameList.php",
    authorization,
    callPayload
  );

  const rawResponse = await call<GetGameListResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["ID", "ConsoleID"],
  });
};
