# Get Game Ticket Stats

A call to `getTicketData()` in this manner will retrieve ticket stats for a game, targeted by that game's unique ID.

## Examples

```ts
import { getTicketData } from "@retroachievements/api";

const ticketStats = await getTicketData(authorization, { gameId: 14402 });
```

## Returns

```json
{
  "gameId": 14402,
  "gameTitle": "Dragster",
  "consoleName": "Atari 2600",
  "openTickets": 0,
  "url": "https://retroachievements.org/ticketmanager.php?g=14402"
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                 |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                |
| `gameId`        | `string` or `number`                        | The unique game ID. If you are unsure, open the game's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getTicketData.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/ticket/getTicketData.ts)  
[RAWeb, API_GetTicketData.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetTicketData.php)
