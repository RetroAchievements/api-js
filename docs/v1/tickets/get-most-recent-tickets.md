# Get Most Recent Tickets

A call to `getTicketData()` in this manner will retrieve ticket metadata information about the latest opened achievement tickets on RetroAchievements.

## Examples

```ts
import { getTicketData } from "@retroachievements/api";

const mostRecentTickets = await getTicketData(authorization);
```

```ts
const firstHundredTickets = await getTicketData(authorization, {
  count: 100
});

const secondHundredTickets = await getTicketData(authorization, {
  count: 100,
  offset: 100
});
```

## Returns

```json
{
  "recentTickets": [
    {
      "id": 56128,
      "achievementId": 285029,
      "achievementTitle": "Highly Unusual",
      "achievementDesc": "Complete the Astral Plane mission",
      "points": 5,
      "badgeName": "316108",
      "achievementAuthor": "TeddyWestside",
      "gameId": 19144,
      "consoleName": "PlayStation 2",
      "gameTitle": "X-Men Legends",
      "gameIcon": "/Images/067536.png",
      "reportedAt": "2023-02-03 20:39:42",
      "reportType": 2,
      "hardcore": true,
      "reportNotes": "mockReportNotes",
      "reportedBy": "ManyHours",
      "resolvedAt": null,
      "resolvedBy": null,
      "reportState": 1,
      "reportStateDescription": "Open",
      "reportTypeDescription": "Did not trigger"
    },
    {
      "id": 56126,
      "achievementId": 64753,
      "achievementTitle": "Playing With a Handicap",
      "achievementDesc": "Beat the easy CPU with the 'next piece' display off ",
      "points": 10,
      "badgeName": "68138",
      "achievementAuthor": "Thoreau",
      "gameId": 4939,
      "consoleName": "Game Boy Color",
      "gameTitle": "Tetris DX",
      "gameIcon": "/Images/003696.png",
      "reportedAt": "2023-02-03 20:08:49",
      "reportType": 2,
      "hardcore": true,
      "reportNotes": "mockReportNotes",
      "reportedBy": "TheJ5333",
      "resolvedAt": null,
      "resolvedBy": null,
      "reportState": 1,
      "reportStateDescription": "Open",
      "reportTypeDescription": "Did not trigger"
    }
    // ...
  ],
  "openTickets": 732,
  "url": "https://retroachievements.org/ticketmanager.php"
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `count`         | `number?`                                   | Optional. How many recent tickets to fetch. The default is 10. The max is 100.                                               |
| `offset`        | `number?`                                   | Optional. How many recent tickets to skip. Useful for pagination. Zero-indexed. The default is 0.                            |

## Source

[@retroachievements/api, getTicketData.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/ticket/getTicketData.ts)  
[RAWeb, API_GetTicketData.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetTicketData.php)
