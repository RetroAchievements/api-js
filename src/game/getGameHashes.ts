import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GameHashes, GetGameHashesResponse } from "./models";

/**
 * A call to this function will retrieve a list of hashes linked to a game.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @example
 * ```
 * const game = await getGameHashes(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing a list of game hashes.
 * ```json
 * {
 *   "results": [
 *     {
 *       "md5": "1b1d9ac862c387367e904036114c4825",
 *       "name": "Sonic The Hedgehog (USA, Europe) (Ru) (NewGame).md",
 *       "labels": ["nointro", "rapatches"],
 *       "patchUrl": "https://github.com/RetroAchievements/RAPatches/raw/main/MD/Translation/Russian/1-Sonic1-Russian.zip"
 *     },
 *     {
 *       "md5": "1bc674be034e43c96b86487ac69d9293",
 *       "name": "Sonic The Hedgehog (USA, Europe).md",
 *       "labels": ["nointro"],
 *       "patchUrl": null
 *     }
 *   ]
 * }
 * ```
 */
export const getGameHashes = async (
  authorization: AuthObject,
  payload: { gameId: ID }
): Promise<GameHashes> => {
  const { gameId } = payload;

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameHashes.php",
    authorization,
    { i: gameId }
  );

  const rawResponse = await call<GetGameHashesResponse>({ url });

  return serializeProperties(rawResponse);
};
