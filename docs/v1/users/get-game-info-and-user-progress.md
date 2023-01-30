# getGameInfoAndUserProgress

A call to this function will retrieve extended metadata about a game, in addition to a user's progress about that game. This is targeted via a game's unique ID and a given username.

## Examples

```ts
import { getGameInfoAndUserProgress } from "@retroachievements/api";

const gameInfoAndUserProgress = await getGameInfoAndUserProgress(
  authorization,
  {
    userName: "wv_pinball",
    gameId: 14402
  }
);
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
  "imageBoxArt": "/Images/066952.png",
  "publisher": "Activision ",
  "developer": "David Crane",
  "genre": "Racing",
  "released": 1980,
  "isFinal": false,
  "consoleName": "Atari 2600",
  "richPresencePatch": "2b92fa1bf9635c303b3b7f8feea3ed3c",
  "numAchievements": 12,
  "numDistinctPlayersCasual": 496,
  "numDistinctPlayersHardcore": 350,
  "achievements": {
    "79434": {
      "id": 79434,
      "numAwarded": 366,
      "numAwardedHardcore": 274,
      "title": "Novice Dragster Driver 1",
      "description": "Complete your very first race in game 1.",
      "points": 1,
      "trueRatio": 1,
      "author": "Boldewin",
      "dateModified": "2019-08-01 19:03:46",
      "dateCreated": "2019-07-31 18:49:57",
      "badgeName": "85541",
      "displayOrder": 0,
      "memAddr": "f5c41fa0b5fa0d5fbb8a74c598f18582",

      /**
       * These two fields are added if the achievement
       * has been earned by the user.
       */
      "dateEarned": "2022-08-23 22:56:38",
      "dateEarnedHardcore": "2022-08-23 22:56:38"
    },
    "79435": {
      "id": 79435,
      "numAwarded": 288,
      "numAwardedHardcore": 230,
      "title": "Novice Dragster Driver 2",
      "description": "Complete your very first race in game 2.",
      "points": 1,
      "trueRatio": 1,
      "author": "Boldewin",
      "dateModified": "2022-11-22 01:00:21",
      "dateCreated": "2019-07-31 18:50:02",
      "badgeName": "85542",
      "displayOrder": 0,
      "memAddr": "2137522101d9046494b57b22ac385a25"
    }
    // ...
  },
  "numAwardedToUser": 4,
  "numAwardedToUserHardcore": 4,
  "userCompletion": "12.00%",
  "userCompletionHardcore": "12.00%"
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `userName`      | `string`                                    | The user for which to retrieve the game progress for.                                                                                       |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getGameInfoAndUserProgress.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/user/getGameInfoAndUserProgress.ts)  
[RAWeb, API_GetGameInfoAndUserProgress.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetGameInfoAndUserProgress.php)
