# getAchievementsEarnedBetween

A call to this function will retrieve a list of achievements earned by a given user between two provided dates.

## Examples

```ts
import { getAchievementsEarnedBetween } from "@retroachievements/api";

const achievements = await getAchievementsEarnedBetween(authorization, {
  userName: "deng",
  fromDate: new Date("2022-10-12"),
  toDate: new Date("2022-10-13")
});
```

## Returns

```json
[
  {
    "date": "2022-10-12 18:12:26",
    "hardcoreMode": false,
    "achievementId": 225335,
    "title": "You Got a Family, Phil?",
    "description": "Earn the No Cheese! Goofy Goober token",
    "badgeName": "250698",
    "points": 5,
    "author": "pinguupinguu",
    "gameTitle": "SpongeBob SquarePants: The Movie",
    "gameIcon": "/Images/059007.png",
    "gameId": 19018,
    "consoleName": "PlayStation 2",
    "cumulScore": 5,
    "badgeUrl": "/Badge/250698.png",
    "gameUrl": "/game/19018"
  },
  {
    "date": "2022-10-12 18:12:26",
    "hardcoreMode": true,
    "achievementId": 225335,
    "title": "You Got a Family, Phil?",
    "description": "Earn the No Cheese! Goofy Goober token",
    "badgeName": "250698",
    "points": 5,
    "author": "pinguupinguu",
    "gameTitle": "SpongeBob SquarePants: The Movie",
    "gameIcon": "/Images/059007.png",
    "gameId": 19018,
    "consoleName": "PlayStation 2",
    "cumulScore": 10,
    "badgeUrl": "/Badge/250698.png",
    "gameUrl": "/game/19018"
  }
  // ...
]
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the list of achievements for.                                                                 |
| `fromDate`      | `Date`                                      | When the list of achievements should begin.                                                                                  |
| `toDate`        | `Date`                                      | When the list of achievements should end.                                                                                    |

## Source

[@retroachievements/api, getAchievementsEarnedBetween.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/user/getAchievementsEarnedBetween.ts)  
[RAWeb, API_GetAchievementsEarnedBetween.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetAchievementsEarnedBetween.php)
