# getUserAwards

A call to this function will retrieve metadata about the target user's site awards, via their username.

## Examples

```ts
import { getUserAwards } from "@retroachievements/api";

const userAwards = await getUserAwards(authorization, { userName: "xelnia" });
```

## Returns

```json
{
  "totalAwardsCount": 10,
  "hiddenAwardsCount": 2,
  "masteryAwardsCount": 6,
  "completionAwardsCount": 0,
  "beatenHardcoreAwardsCount": 24,
  "beatenSoftcoreAwardsCount": 7,
  "eventAwardsCount": 0,
  "siteAwardsCount": 2,
  "visibleUserAwards": [
    {
      "awardedAt": "2022-08-26T19:34:43+00:00",
      "awardType": "Mastery/Completion",
      "awardData": 802,
      "awardDataExtra": 1,
      "displayOrder": 114,
      "title": "WarioWare, Inc.: Mega Microgames!",
      "consoleName": "Game Boy Advance",
      "flags": null,
      "imageIcon": "/Images/034678.png"
    }
  ]
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user for which to retrieve the site awards for.                                                                          |

## Source

[@retroachievements/api, getUserAwards.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/user/getUserAwards.ts)  
[RAWeb, API_GetUserAwards.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserAwards.php)
