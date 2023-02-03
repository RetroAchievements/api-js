# getGameRankAndScore

A call to this function will retrieve metadata about either the latest masters for a game, or the highest points earners for a game. The game is targeted via its unique ID.

## Examples

```ts
import { getGameRankAndScore } from "@retroachievements/api";

const gameRankAndScore = await getGameRankAndScore(authorization, {
  gameId: 14402,
  type: "latest-masters"
});
```

```ts
import { getGameRankAndScore } from "@retroachievements/api";

const gameRankAndScore = await getGameRankAndScore(authorization, {
  gameId: 14400,
  type: "latest-masters"
});
```

## Returns

```json
// Note the ordering on this response.
// For latest-masters, the first entry will be the
// most recent mastery for the set. For high-scores
// it will be the first person to master the set.
[
  {
    "user": "BruceLee1255",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:43",
    "rank": 27
  },
  {
    "user": "captainbarlow",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:38",
    "rank": 26
  },
  {
    "user": "SporyTike",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:32",
    "rank": 25
  },
  {
    "user": "NeGAtiv4k",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:27",
    "rank": 24
  },
  {
    "user": "Thoreau",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:21",
    "rank": 23
  },
  {
    "user": "Garunaki",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:16",
    "rank": 22
  },
  {
    "user": "Shootzy",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:11",
    "rank": 21
  },
  {
    "user": "JAM",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:05",
    "rank": 20
  },
  {
    "user": "DarknessZedzi",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:19:00",
    "rank": 19
  },
  {
    "user": "jos",
    "totalScore": 0,
    "lastAward": "2019-07-30 23:18:55",
    "rank": 18
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |
| `type`          | `"latest-masters"` or `"high-scores"`       | Whether you want the list of latest masters or the list of who mastered the set first (or has scored highest).                              |

## Source

[@retroachievements/api, getGameRankAndScore.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/game/getGameRankAndScore.ts)  
[RAWeb, API_GetGameRankAndScore.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetGameRankAndScore.php)
