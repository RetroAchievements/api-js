# getClaims

A call to this function returns information about all (1000 max) set claims of a specified kind: completed, dropped, or expired.

## Examples

```ts
import { getClaims } from "@retroachievements/api";

const claims = await getClaims(authorization, { claimKind: "dropped" });
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
| `claimKind`     | "completed", "dropped", or "expired"        | The type of filter to apply to the list of fetched claims.                                                                   |

## Source

[@retroachievements/api, getClaims.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/feed/getClaims.ts)  
[RAWeb, API_GetClaims.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetClaims.php)
