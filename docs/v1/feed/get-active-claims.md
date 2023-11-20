# getActiveClaims

A call to this function returns information about all (1000 max) active set claims.

## Examples

```ts
import { getActiveClaims } from "@retroachievements/api";

const activeClaims = await getActiveClaims(authorization);
```

## Returns

```json
[
  {
    "id": 7044,
    "user": "blendedsea",
    "gameId": 19212,
    "gameTitle": "SpongeBob SquarePants: Battle for Bikini Bottom",
    "gameIcon": "/Images/059776.png",
    "consoleName": "PlayStation 2",
    "consoleId": 22,
    "claimType": 0,
    "setType": 0,
    "status": 0,
    "extension": 0,
    "special": 0,
    "created": "2022-10-04 00:25:06",
    "doneTime": "2023-01-04 00:25:06",
    "updated": "2022-10-04 00:25:06",
    "minutesLeft": 112523,
    "userIsJrDev": false
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |

## Source

[@retroachievements/api, getActiveClaims.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/feed/getActiveClaims.ts)  
[RAWeb, API_GetActiveClaims.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetActiveClaims.php)
