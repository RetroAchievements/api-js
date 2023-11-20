# Get Most Ticketed Games

A call to `getTicketData()` in this manner will retrieve the games on the site with the highest count of opened achievement tickets.

## Examples

```ts
import { getTicketData } from "@retroachievements/api";

const mostTicketedGames = await getTicketData(authorization, {
  isGettingMostTicketedGames: true
});
```

## Returns

```json
{
  "mostReportedGames": [
    {
      "gameId": 2642,
      "gameTitle": "Kingdom Hearts: 358/2 Days",
      "gameIcon": "/Images/056478.png",
      "console": "Nintendo DS",
      "openTickets": 6
    },
    {
      "gameId": 13964,
      "gameTitle": "Grinch, The",
      "gameIcon": "/Images/065586.png",
      "console": "PlayStation",
      "openTickets": 6
    }
    // ...
  ],
  "url": "https://retroachievements.org/ticketmanager.php?f=1"
}
```

## Parameters

| Name                         | Type                                        | Description                                                                                                                  |
| :--------------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization`              | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `isGettingMostTicketedGames` | `true`                                      | This value must be set to `true`.                                                                                            |
| `count`                      | `number?`                                   | Optional. How many games to fetch. The default is 10. The max is 100.                                                        |
| `offset`                     | `number?`                                   | Optional. How many games to skip. Useful for pagination. Zero-indexed. The default is 0.                                     |

## Source

[@retroachievements/api, getTicketData.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/ticket/getTicketData.ts)  
[RAWeb, API_GetTicketData.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetTicketData.php)
