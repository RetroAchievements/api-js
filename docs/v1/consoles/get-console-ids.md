# getConsoleIds

A call to this function will retrieve the complete list of console ID and name pairs on the RetroAchievements.org platform.

## Examples

```ts
import { getConsoleIds } from "@retroachievements/api";

const consoleIds = await getConsoleIds(authorization);
```

## Returns

```json
[
  { "id": 1, "name": "Mega Drive" },
  { "id": 2, "name": "Nintendo 64" },
  { "id": 3, "name": "SNES" }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |

## Source

[@retroachievements/api, getConsoleIds.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/console/getConsoleIds.ts)  
[RAWeb, API_GetConsoleIDs.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetConsoleIDs.php)
