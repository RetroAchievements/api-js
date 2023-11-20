# getUserCompletedGames

A call to this function will retrieve completion metadata about the games a given user has played. It returns two entries per each game: one for the softcore completion and one for the hardcore completion. These are designated by the `hardcoreMode` property on each completion object.

## Examples

```ts
import { getUserCompletedGames } from "@retroachievements/api";

const userCompletedGames = await getUserCompletedGames(authorization, {
  userName: "xelnia"
});
```

## Returns

```json
[
  // There will be two records for each game played by the user.
  {
    "gameId": 14976,
    "title": "Mortal Kombat",
    "imageIcon": "/Images/036812.png",
    "consoleId": 27,
    "consoleName": "Arcade",
    "maxPossible": 35,
    "numAwarded": 13,
    "pctWon": 0.3714,
    "hardcoreMode": false
  },
  {
    "gameId": 14976,
    "title": "Mortal Kombat",
    "imageIcon": "/Images/036812.png",
    "consoleId": 27,
    "consoleName": "Arcade",
    "maxPossible": 35,
    "numAwarded": 13,
    "pctWon": 0.3714,
    "hardcoreMode": true
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the completion metadata for.                                                                  |

## Source

[@retroachievements/api, getUserCompletedGames.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/user/getUserCompletedGames.ts)  
[RAWeb, API_GetUserCompletedGames.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserCompletedGames.php)
