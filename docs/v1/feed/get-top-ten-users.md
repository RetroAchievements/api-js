# getTopTenUsers

A call to this function will retrieve the current top ten users on the site.

## Examples

```ts
import { getTopTenUsers } from "@retroachievements/api";

const topTenUsers = await getTopTenUsers(authorization);
```

## Returns

```json
[
  { "userName": "MockUser", "totalPoints": 350000, "totalRatioPoints": 995000 },
  { "userName": "MockUser2", "totalPoints": 345000, "totalRatioPoints": 994000 }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |

## Source

[@retroachievements/api, getTopTenUsers.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/feed/getTopTenUsers.ts)  
[RAWeb, API_GetTopTenUsers.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetTopTenUsers.php)
