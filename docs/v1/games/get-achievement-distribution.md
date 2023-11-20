# getAchievementDistribution

A call to this function will retrieve a dictionary of the number of players who have earned a specific number of achievements for a given game ID. This endpoint can be used to determine the total mastery count for a game, as well as how rare that overall mastery is.

## Examples

```ts
import { getAchievementDistribution } from "@retroachievements/api";

const achievementDistribution = await getAchievementDistribution(
  authorization,
  {
    gameId: 14402,
    hardcore: true
  }
);
```

## Returns

```json
{
  "1": 64,
  "2": 19,
  "3": 11,
  "4": 18,
  "5": 25,
  "6": 20,
  "7": 26,
  "8": 29,
  "9": 54,
  "10": 17,
  "11": 29,
  "12": 4
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getAchievementDistribution.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/game/getAchievementDistribution.ts)  
[RAWeb, API_GetAchievementDistribution.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetAchievementDistribution.php)
