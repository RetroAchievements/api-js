# Get Achievement Ticket Stats

A call to `getTicketData()` in this manner will retrieve ticket stats for an achievement, targeted by that achievement's unique ID.

## Examples

```ts
import { getTicketData } from "@retroachievements/api";

const ticketStats = await getTicketData(authorization, {
  achievementId: 12345
});
```

## Returns

```json
{
  "achievementId": 284759,
  "achievementTitle": "The End of The Beginning",
  "achievementDescription": "Receive the Package from the King of Baron and begin your quest to the Mist Cavern",
  "url": "https://retroachievements.org/ticketmanager.php?a=284759",
  "openTickets": 1
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                                               |
| :-------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object.                              |
| `achievementId` | `string` or `number`                        | The unique achievement ID. If you are unsure, open the achievement's page on the RetroAchievements.org website and copy the number at the end of the URL. |

## Source

[@retroachievements/api, getTicketData.ts](https://github.dev/retroachievements/retroachievements-api-js/blob/main/src/ticket/getTicketData.ts)  
[RAWeb, API_GetTicketData.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetTicketData.php)
