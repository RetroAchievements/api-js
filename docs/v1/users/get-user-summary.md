# getUserSummary

A call to this function will retrieve summary information about a given user, targeted by username.

## Examples

```ts
import { getUserSummary } from "@retroachievements/api";

// This gets the user's 10 most recently played games.
const userSummary = await getUserSummary(authorization, {
  userName: "xelnia"
});
```

## Returns

```json
  recentlyPlayedCount: 2,
  recentlyPlayed: [
    {
      gameId: 19_020,
      consoleId: 21,
      consoleName: "PlayStation 2",
      title: "Mortal Kombat: Deadly Alliance",
      imageIcon: "/Images/064938.png",
      lastPlayed: "2023-01-27 02:05:02"
    },
    {
      gameId: 15_922,
      consoleId: 7,
      consoleName: "NES",
      title: "~Hack~ Mega Man 3 Revamped",
      imageIcon: "/Images/061792.png",
      lastPlayed: "2022-11-07 21:49:09"
    },
    // ...
  ],
  memberSince: "2020-02-02 20:10:35",
  lastActivity: {
    id: 59_195_489,
    timestamp: "2023-01-27 02:13:21",
    lastupdate: "2023-01-27 02:13:21",
    activitytype: 1,
    user: "WCopeland",
    data: "281263",
    data2: "1"
  },
  richPresenceMsg: "Arcade [Match 2] - Nitara vs Drahmin (Novice difficulty)",
  lastGameId: 19_020,
  lastGame: {
    id: 19_020,
    title: "Mortal Kombat: Deadly Alliance",
    consoleId: 21,
    forumTopicId: 19_339,
    flags: 0,
    imageIcon: "/Images/064938.png",
    imageTitle: "/Images/057355.png",
    imageIngame: "/Images/057356.png",
    imageBoxArt: "/Images/056153.png",
    publisher: "Midway",
    developer: "Midway",
    genre: "3D Fighting",
    released: "November 16, 2002",
    isFinal: false,
    consoleName: "PlayStation 2",
    richPresencePatch: "MockRichPresencePatch"
  },
  contribCount: 0,
  contribYield: 0,
  totalPoints: 18_817,
  totalSoftcorePoints: 25,
  totalTruePoints: 56_984,
  permissions: 1,
  untracked: false,
  id: 117_089,
  userWallActive: true,
  motto: "https://i.imgur.com/ov30jeD.jpg",
  rank: 1372,
  awarded: {
    "1829": {
      numPossibleAchievements: 80,
      possibleScore: 738,
      numAchieved: 16,
      scoreAchieved: 95,
      numAchievedHardcore: 16,
      scoreAchievedHardcore: 95
    },
    "6278": {
      numPossibleAchievements: 42,
      possibleScore: 478,
      numAchieved: 0,
      scoreAchieved: 0,
      numAchievedHardcore: 0,
      scoreAchievedHardcore: 0
    },
    // ...
  },
  recentAchievements: {
    "19020": {
      "281248": {
        id: 281_248,
        gameId: 19_020,
        gameTitle: "Mortal Kombat: Deadly Alliance",
        title: "Head Stomp",
        description: "Perform a Fatality as Jax.",
        points: 3,
        badgeName: "311063",
        isAwarded: true,
        dateAwarded: "2023-01-27 02:04:36",
        hardcoreAchieved: false
      }
    }
  },
  points: 18_817,
  softcorePoints: 25,
  userPic: "/UserPic/WCopeland.png",
  totalRanked: 34_572,
  status: "Offline"
```

## Parameters

| Name                      | Type                                        | Description                                                                                                                  |
| :------------------------ | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization`           | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`                | `string`                                    | The user for which to retrieve the summary for.                                                                              |
| `recentGamesCount`        | `number?`                                   | Optional. How many recent games to fetch. The default is 5.                                                                  |
| `recentAchievementsCount` | `number?`                                   | Optional. How many recent achievements to fetch. The default is 5.                                                           |

## Source

[@retroachievements/api, getUserSummary.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/user/getUserSummary.ts)  
[RAWeb, API_GetUserSummary.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetUserSummary.php)
