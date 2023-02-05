# getGameExtended

A call to this function will retrieve extended metadata about a game, targeted via its unique ID.

## Examples

```ts
import { getGameExtended } from "@retroachievements/api";

const gameExtended = await getGameExtended(authorization, {
  gameId: 14402
});
```

## Returns

```json
{
  "id": 14402,
  "title": "Dragster",
  "consoleId": 25,
  "forumTopicId": 9145,
  "flags": 0,
  "imageIcon": "/Images/026368.png",
  "imageTitle": "/Images/026366.png",
  "imageIngame": "/Images/026367.png",
  "imageBoxArt": "/Images/026365.png",
  "publisher": "Activision",
  "developer": "David Crane",
  "genre": "Racing",
  "released": 1980,
  "isFinal": false,
  "consoleName": "Atari 2600",
  "richPresencePatch": "2b92fa1bf9635c303b3b7f8feea3ed3c",
  "numAchievements": 12,
  "numDistinctPlayersCasual": 454,
  "numDistinctPlayersHardcore": 323,
  "claims": [],
  "achievements": {
    "79434": {
      "id": 79434,
      "numAwarded": 338,
      "numAwardedHardcore": 253,
      "title": "Novice Dragster Driver 1",
      "description": "Complete your very first race in game 1.",
      "points": 1,
      "trueRatio": 1,
      "author": "Boldewin",
      "dateModified": "2019-08-01 19:03:46",
      "dateCreated": "2019-07-31 18:49:57",
      "badgeName": "85541",
      "displayOrder": 0,
      "memAddr": "f5c41fa0b5fa0d5fbb8a74c598f18582"
    }
  }
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getGameExtended.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/game/getGameExtended.ts)  
[RAWeb, API_GetGameExtended.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetGameExtended.php)
