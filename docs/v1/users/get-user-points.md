# getUserPoints

A call to this function will retrieve a given user's hardcore and softcore points.

## Examples

```ts
import { getUserPoints } from "@retroachievements/api";

const userPoints = await getUserPoints(authorization, {
  userName: "xelnia"
});
```

## Returns

```json
{
  "points": 7640,
  "softcorePoints": 25
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the point totals for.                                                                         |

## Source

[@retroachievements/api, getUserPoints.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/user/getUserPoints.ts)  
[RAWeb, API_GetUserPoints.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserPoints.php)
