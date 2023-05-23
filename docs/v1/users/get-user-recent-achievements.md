# getUserRecentAchievements

A call to this function will retrieve a list of a target user's recently earned achievements, via their username. By default, it fetches achievements earned in the last hour.

## Examples

```ts
import { getUserRecentAchievements } from "@retroachievements/api";

// This gets the user's achievements earned in the last hour.
const userRecentAchievements = await getUserRecentAchievements(authorization, {
  userName: "xelnia"
});
```

```ts
import { getUserRecentAchievements } from "@retroachievements/api";

// This gets the user's achievements earned in the last two hours.
const userRecentAchievements = await getUserRecentAchievements(authorization, {
  userName: "xelnia",
  recentMinutes: 120
});
```

## Returns

```json
[
  {
    "date": "2023-05-23 22:32:24",
    "hardcoreMode": true,
    "achievementId": 51214,
    "title": "You're a special Champ!",
    "description": "Win the Tournament as [You] on Hard with 1 attribute on max. and 1 attribute on min.",
    "badgeName": "121991",
    "points": 25,
    "author": "Som1",
    "gameTitle": "WWF King of the Ring",
    "gameIcon": "/Images/062599.png",
    "gameId": 6316,
    "consoleName": "Game Boy",
    "badgeUrl": "/Badge/121991.png",
    "gameUrl": "/game/6316"
  }
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the recently earned achievements for.                                                         |
| `recentMinutes` | `number?`                                   | Optional. Defaults to 60. How many minutes back to fetch for the given user.                                                 |

## Source

[@retroachievements/api, getUserRecentAchievements.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/user/getUserRecentAchievements.ts)  
[RAWeb, API_GetUserRecentAchievements.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserRecentAchievements.php)
