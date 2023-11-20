# getAchievementOfTheWeek

A call to this function will retrieve comprehensive metadata about the current Achievement of the Week.

## Examples

```ts
import { getAchievementOfTheWeek } from "@retroachievements/api";

const achievementOfTheWeek = await getAchievementOfTheWeek(authorization);
```

## Returns

```json
{
  "achievement": {
    "id": "165062",
    "title": "The True Hero",
    "description": "Receive any Ending as Han [Normal or Hard]",
    "points": "10",
    "trueRatio": "22",
    "author": "BigWeedSmokerMan",
    "dateCreated": "2021-08-08 17:47:46",
    "dateModified": "2021-08-09 12:20:05"
  },
  "console": { "id": "39", "title": "Saturn" },
  "forumTopic": { "id": "14767" },
  "game": { "id": "14513", "title": "Guardian Heroes" },
  "startAt": "2022-10-10 00:00:00",
  "totalPlayers": "219",
  "unlocks": [
    {
      "user": "Tirbaba2",
      "rAPoints": "72",
      "dateAwarded": "2022-10-10 01:42:19",
      "hardcoreMode": "1"
    }
    // ...
  ],
  "unlocksCount": "40"
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |

## Source

[@retroachievements/api, getAchievementOfTheWeek.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/feed/getAchievementOfTheWeek.ts)  
[RAWeb, API_GetAchievementOfTheWeek.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetAchievementOfTheWeek.php)
