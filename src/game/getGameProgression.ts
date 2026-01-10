import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { GameProgression, GetGameProgressionResponse } from "./models";

/**
 * A call to this function will retrieve information about the average time to unlock achievements in a game.
 *
 * @param authorization An object containing your username and webApiKey.
 * This can be constructed with `buildAuthorization()`.
 *
 * @param payload.gameId The unique game ID. If you are unsure, open the
 * game's page on the RetroAchievements.org website. For example, Dragster's
 * URL is https://retroachievements.org/game/14402. We can see from the
 * URL that the game ID is "14402".
 *
 * @param payload.hardcore Optional. By default, set to false, with both
 * softcore and hardcore tallies returned in the response. If this option
 * is set to true, only hardcore unlocks will be included in the totals.
 *
 * @example
 * ```
 * const game = await getGameProgression(
 *   authorization,
 *   { gameId: 14402, hardcore: true }
 * );
 * ```
 *
 * @returns An object containing information about the average time to unlock achievements in a game.
 * ```json
 * {
 *   "id": 228,
 *   "title": "Super Mario World",
 *   "consoleId": 3,
 *   "consoleName": "SNES/Super Famicom",
 *   "imageIcon": "/Images/112443.png",
 *   "numDistinctPlayers": 79281,
 *   "timesUsedInBeatMedian": 4493,
 *   "timesUsedInHardcoreBeatMedian": 8249,
 *   "medianTimeToBeat": 17878,
 *   "medianTimeToBeatHardcore": 19224,
 *   "timesUsedInCompletionMedian": 155,
 *   "timesUsedInMasteryMedian": 1091,
 *   "medianTimeToComplete": 67017,
 *   "medianTimeToMaster": 79744,
 *   "numAchievements": 89,
 *   "achievements": [
 *     {
 *       "id": 342,
 *       "title": "Giddy Up!",
 *       "description": "Catch a ride with a friend",
 *       "points": 1,
 *       "trueRatio": 1,
 *       "type": null,
 *       "badgeName": "46580",
 *       "numAwarded": 75168,
 *       "numAwardedHardcore": 37024,
 *       "timesUsedInUnlockMedian": 63,
 *       "timesUsedInHardcoreUnlockMedian": 69,
 *       "medianTimeToUnlock": 274,
 *       "medianTimeToUnlockHardcore": 323
 *     },
 *     {
 *       "id": 341,
 *       "title": "Unleash The Dragon",
 *       "description": "Collect 5 Dragon Coins in a level",
 *       "points": 2,
 *       "trueRatio": 2,
 *       "type": null,
 *       "badgeName": "46591",
 *       "numAwarded": 66647,
 *       "numAwardedHardcore": 34051,
 *       "timesUsedInUnlockMedian": 66,
 *       "timesUsedInHardcoreUnlockMedian": 70,
 *       "medianTimeToUnlock": 290,
 *       "medianTimeToUnlockHardcore": 333
 *     }
 *   ]
 * }
 * ```
 */
export const getGameProgression = async (
  authorization: AuthObject,
  payload: {
    gameId: ID;
    hardcore?: boolean;
  }
): Promise<GameProgression> => {
  const { gameId, hardcore } = payload;

  const queryParams: Record<string, any> = { i: gameId };

  if (hardcore !== undefined) {
    queryParams["h"] = hardcore === true ? 1 : 0;
  }

  const url = buildRequestUrl(
    apiBaseUrl,
    "/API_GetGameProgression.php",
    authorization,
    queryParams
  );

  const rawResponse = await call<GetGameProgressionResponse>({ url });

  return serializeProperties(rawResponse);
};
