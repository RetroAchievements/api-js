# getAchievementCount

A call to this function will retrieve the list of achievement IDs for a game, targeted by game ID.

## Examples

```ts
import { getAchievementCount } from "@retroachievements/api";

const achievementCount = await getAchievementCount(authorization, {
  gameId: 14402
});
```

## Returns

```json
{
  "gameId": 14402,
  "achievementIds": [1, 2, 3, 4, 5]
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getAchievementCount.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/game/getAchievementCount.ts)  
[RAWeb, API_GetAchievementCount.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetAchievementCount.php)
