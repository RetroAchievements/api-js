# getGameRating

A call to this function will retrieve metadata about how users have rated the game and its set.

## Examples

```ts
import { getGameRating } from "@retroachievements/api";

const gameRating = await getGameRating(authorization, {
  gameId: 14402
});
```

## Returns

```json
// As of the time this page was published, achievements
// cannot be rated, only games. Therefore, `achievements`
// and `achievementsNumVotes` will always be zero.
{
  "gameId": 14402,
  "ratings": {
    "game": 3.1875,
    "achievements": 0,
    "gameNumVotes": 16,
    "achievementsNumVotes": 0
  }
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getGameRating.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/game/getGameRating.ts)  
[RAWeb, API_GetGameRating.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetGameRating.php)
