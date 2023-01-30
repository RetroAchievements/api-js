# getUserGameRankAndScore

A call to this function will retrieve metadata about how a given user has performed/ranked on a given game, targeted by game ID.

## Examples

```ts
import { getUserGameRankAndScore } from "@retroachievements/api";

const userGameRankAndScore = await getUserGameRankAndScore(authorization, {
  userName: "xelnia",
  gameId: 14402
});
```

## Returns

```json
// If there is no user progress for the game, this array will be empty.
[
  {
    "user": "xelnia",
    "totalScore": 378,
    "lastAward": "2022-09-01 21:51:23",
    "userRank": 3
  }
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `userName`      | `string`                                    | The user for which to retrieve the game rank and score for.                                                                                 |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getUserGameRankAndScore.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/user/getUserGameRankAndScore.ts)  
[RAWeb, API_GetUserGameRankAndScore.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserGameRankAndScore.php)
