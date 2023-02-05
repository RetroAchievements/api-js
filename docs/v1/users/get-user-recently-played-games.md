# getUserRecentlyPlayedGames

A call to this function will retrieve a list of a target user's recently played games, via their username.

## Examples

```ts
import { getUserRecentlyPlayedGames } from "@retroachievements/api";

// This gets the user's 10 most recently played games.
const userRecentlyPlayedGames = await getUserRecentlyPlayedGames(
  authorization,
  {
    userName: "xelnia"
  }
);
```

```ts
import { getUserRecentlyPlayedGames } from "@retroachievements/api";

// This skips the user's first 10 most recently played games
// and actually returns games 11-20. This is an example of how
// the `offset` option is useful for pagination.
const userRecentlyPlayedGames = await getUserRecentlyPlayedGames(
  authorization,
  {
    userName: "xelnia",
    offset: 10
  }
);
```

## Returns

```json
[
  {
    "gameId": 19010,
    "consoleId": 21,
    "consoleName": "PlayStation 2",
    "title": "Simpsons, The: Hit & Run",
    "imageIcon": "/Images/066024.png",
    "lastPlayed": "2022-10-24 22:05:12",
    "numPossibleAchievements": 131,
    "possibleScore": 865,
    "numAchieved": 23,
    "scoreAchieved": 84,
    "numAchievedHardcore": 23,
    "scoreAchievedHardcore": 84
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the recently played games for.                                                                |
| `count`         | `number?`                                   | Optional. How many recent games to fetch. The default is 10. The max is 50.                                                  |
| `offset`        | `number?`                                   | Optional. How many recent games to skip. Useful for pagination. Zero-indexed. The default is 0.                              |

## Source

[@retroachievements/api, getUserRecentlyPlayedGames.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/user/getUserRecentlyPlayedGames.ts)  
[RAWeb, API_GetUserRecentlyPlayedGames.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserRecentlyPlayedGames.php)
