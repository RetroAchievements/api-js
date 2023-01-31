# getAchievementUnlocks

A call to this function will retrieve a list of users who have earned an achievement, targeted by the achievement's ID.

## Examples

```ts
import { getAchievementUnlocks } from "@retroachievements/api";

const achievementUnlocks = await getAchievementUnlocks(authorization, {
  achievementId: 13876
});
```

## Returns

```json
[
  {
    "user": "Podgicus0305",
    "raPoints": 15544,
    "dateAwarded": "2022-07-12 19:06:34",
    "hardcoreMode": true
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                                                                                                             |
| :-------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                                                                                                            |
| `achievementId` | `string` or `number`                        | The target achievement we want to retrieve the unlocks list for. If you're not sure of this, it can be found by navigating to the achievement's page on the RetroAchievements.org website and copying the number at the end of the URL. |
| `count`         | `number?`                                   | Optional. How many unlock records to return. The default is 50. The max is 500.                                                                                                                                                         |
| `offset`        | `number?`                                   | Optional. How many unlock records to skip. Useful for pagination. Zero-indexed. The default is 0.                                                                                                                                       |

## Source

[@retroachievements/api, getAchievementUnlocks.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/achievement/getAchievementUnlocks.ts)  
[RAWeb, API_GetAchievementUnlocks.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetAchievementUnlocks.php)
