# getGameList

A call to this function will retrieve the complete list of games for a specified console on the RetroAchievements.org platform, targeted by the console ID. If you do not know the console ID you're looking for, try using the [`getConsoleIds()`](/v1/consoles/get-console-ids) function.

## Examples

```ts
import { getGameList } from "@retroachievements/api";

const gameList = await getGameList(authorization, {
  consoleId: 1,
  shouldOnlyRetrieveGamesWithAchievements: true,
  shouldRetrieveGameHashes: true
});
```

## Returns

```json
[
  {
    "title": "Elemental Master",
    "id": 4247,
    "consoleId": 1,
    "consoleName": "Mega Drive",
    "imageIcon": "/Images/048245.png",
    "numAchievements": 44,
    "numLeaderboards": 0,
    "points": 500,
    "dateModified": "2021-12-09 17:05:39",
    "forumTopicId": 1972,
    "hashes": ["32e1a15161ef1f070b023738353bde51"]
  }
  // ...
]
```

## Parameters

| Name                                      | Type                                        | Description                                                                                                                                         |
| :---------------------------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization`                           | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                        |
| `consoleId`                               | `string` or `number`                        | The unique console ID to retrieve a list of games from. This can be retrieved using the [`getConsoleIds()`](/v1/consoles/get-console-ids) function. |
| `shouldOnlyRetrieveGamesWithAchievements` | `boolean`                                   | Optional. If truthy, will not return games that do not have achievements.                                                                           |
| `shouldRetrieveGameHashes`                | `boolean`                                   | Optional. If truthy, will return valid hashes for game ROMs in a `string` array attached to each game in the list.                                  |

## Source

[@retroachievements/api, getConsoleIds.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/console/getConsoleIds.ts)  
[RAWeb, API_GetConsoleIDs.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetConsoleIDs.php)
