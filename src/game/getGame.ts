import type { ID } from "../utils/internal";
import {
  apiBaseUrl,
  buildRequestUrl,
  call,
  serializeProperties,
} from "../utils/internal";
import type { AuthObject } from "../utils/public";
import type { Game, GetGameResponse } from "./models";

/**
 * A call to this function will retrieve basic metadata about
 * a game, targeted via its unique ID.
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
 * const game = await getGame(
 *   authorization,
 *   { gameId: 14402 }
 * );
 * ```
 *
 * @returns An object containing basic metadata about a target game.
 * ```json
 * {
 *   id: 14402,
 *   title: "Dragster",
 *   forumTopicId: 9145,
 *   consoleId: 25,
 *   consoleName: "Atari 2600",
 *   flags: 0,
 *   imageIcon: "/Images/026368.png",
 *   gameIcon: "/Images/026368.png",
 *   imageTitle: "/Images/026366.png",
 *   imageIngame: "/Images/026367.png",
 *   imageBoxArt: "/Images/026365.png",
 *   publisher: "Activision",
 *   developer: "David Crane",
 *   genre: "Racing",
 *   released: "1980",
 *   gameTitle: "Dragster",
 *   console: "Atari 2600"
 * }
 * ```
 */
export const getGame = async (
  authorization: AuthObject,
  payload: { gameId: ID }
): Promise<Game> => {
  const { gameId } = payload;

  const url = buildRequestUrl(apiBaseUrl, "/API_GetGame.php", authorization, {
    i: gameId,
  });

  const rawResponse = await call<GetGameResponse>({ url });

  return serializeProperties(rawResponse, {
    shouldCastToNumbers: ["ID", "ForumTopicID", "ConsoleID", "Flags"],
  });
};
