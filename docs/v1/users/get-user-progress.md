# getUserProgress

A call to this function will retrieve a given user's progress on a given list of games, targeted by game ID.

## Examples

```ts
import { getUserProgress } from "@retroachievements/api";

const userProgress = await getUserProgress(authorization, {
  userName: "xelnia",
  gameIds: [1, 14402]
});
```

## Returns

```json
{
  "1": {
    "numPossibleAchievements": 24,
    "possibleScore": 255,
    "numAchieved": 0,
    "scoreAchieved": 0,
    "numAchievedHardcore": 0,
    "scoreAchievedHardcore": 0
  },
  "14402": {
    "numPossibleAchievements": 24,
    "possibleScore": 255,
    "numAchieved": 0,
    "scoreAchieved": 0,
    "numAchievedHardcore": 0,
    "scoreAchievedHardcore": 0
  }
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                                                        |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                                                       |
| `userName`      | `string`                                    | The user for which to retrieve the point totals for.                                                                                                                               |
| `gameIds`       | `string[]` or `number[]`                    | An array of RetroAchievements game IDs. If you aren't sure of the game IDs, visit the game's page on the RetroAchievements.org website and copy the numbers at the end of the URL. |

## Source

[@retroachievements/api, getUserProgress.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/user/getUserProgress.ts)  
[RAWeb, API_GetUserProgress.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserProgress.php)
