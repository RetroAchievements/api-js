# getUserClaims

A call to this function will retrieve a list of achievement set claims made over the lifetime of a given user, targeted by their username.

## Examples

```ts
import { getUserClaims } from "@retroachievements/api";

const userClaims = await getUserClaims(authorization, {
  userName: "Jamiras"
});
```

## Returns

```json
[
  {
    "id": 7779,
    "user": "Jamiras",
    "gameId": 11592,
    "gameTitle": "Mary-Kate & Ashley: Get a Clue!",
    "gameIcon": "/Images/065909.png",
    "consoleName": "Game Boy Color",
    "claimType": 0,
    "setType": 0,
    "status": 1,
    "extension": 0,
    "special": 0,
    "created": "2022-12-24 18:11:37",
    "doneTime": "2022-12-27 15:21:16",
    "updated": "2022-12-27 15:21:16",
    "minutesLeft": -48000 // A negative number means the claim has expired.
  },
  {
    "id": 7755,
    "user": "Jamiras",
    "gameId": 16655,
    "gameTitle": "Dragon Quest Monsters: Joker",
    "gameIcon": "/Images/063344.png",
    "consoleName": "Nintendo DS",
    "claimType": 0,
    "setType": 0,
    "status": 0,
    "extension": 0,
    "special": 0,
    "created": "2022-12-22 02:12:18",
    "doneTime": "2023-03-22 02:12:18",
    "updated": "2022-12-22 02:12:18",
    "minutesLeft": 73610
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the claims list for.                                                                          |

## Source

[@retroachievements/api, getUserClaims.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/user/getUserClaims.ts)  
[RAWeb, API_GetUserClaims.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserClaims.php)
