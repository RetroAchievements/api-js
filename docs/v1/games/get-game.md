# getGame

A call to this function will retrieve basic metadata about a game, targeted via its unique ID.

## Examples

```ts
import { getGame } from "@retroachievements/api";

const game = await getGame(authorization, {
  gameId: 14402
});
```

## Returns

```json
{
  "id": 14402,
  "title": "Dragster",
  "forumTopicId": 9145,
  "consoleId": 25,
  "consoleName": "Atari 2600",
  "flags": 0,
  "imageIcon": "/Images/026368.png",
  "gameIcon": "/Images/026368.png",
  "imageTitle": "/Images/026366.png",
  "imageIngame": "/Images/026367.png",
  "imageBoxArt": "/Images/026365.png",
  "publisher": "Activision",
  "developer": "David Crane",
  "genre": "Racing",
  "released": 1980,
  "gameTitle": "Dragster",
  "console": "Atari 2600"
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getGame.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/game/getGame.ts)  
[RAWeb, API_GetGame.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetGame.php)
