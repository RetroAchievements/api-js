import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type {
  GetUserCompletedGamesResponse,
  UserCompletedGames,
} from "./models";

/**
 * A call to this function will retrieve completion metadata
 * about the games a given user has played. It returns two
 * entries per each game: one for the softcore completion and
 * one for the hardcore completion. These are designated by
 * the `hardcoreMode` property on each completion object.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.username The user for which to retrieve the
 * completion metadata for.
 *
 * @example
 * ```
 * const userCompletedGames = await getUserCompletedGames(
 *   authorization,
 *   { username: "xelnia" }
 * );
 * ```
 *
 * @returns An array containing completion metadata objects
 * for a given user. Each game contains two completion records,
 * one for softcore and another for hardcore.
 * ```json
 * [
 *   {
 *     gameId: 14976,
 *     title: 'Mortal Kombat',
 *     imageIcon: '/Images/036812.png',
 *     consoleId: 27,
 *     consoleName: 'Arcade',
 *     maxPossible: 35,
 *     numAwarded: 13,
 *     pctWon: 0.3714,
 *     hardcoreMode: false
 *   },
 *   {
 *     gameId: 14976,
 *     title: 'Mortal Kombat',
 *     imageIcon: '/Images/036812.png',
 *     consoleId: 27,
 *     consoleName: 'Arcade',
 *     maxPossible: 35,
 *     numAwarded: 13,
 *     pctWon: 0.3714,
 *     hardcoreMode: true
 *   },
 * ]
 * ```
 */
export const getUserCompletedGames = async (
  authorization: AuthObject,
  payload: { username: string }
): Promise<UserCompletedGames> => {
  const { username } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetUserCompletedGames.php",
    authorization,
    { u: username }
  );

  const rawResponse = await call<GetUserCompletedGamesResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: [
      "GameID",
      "ConsoleID",
      "MaxPossible",
      "NumAwarded",
      "PctWon",
    ],
    shouldMapToBooleans: ["HardcoreMode"],
  });
};
