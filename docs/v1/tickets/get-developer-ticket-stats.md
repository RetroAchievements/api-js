# Get Developer Ticket Stats

A call to `getTicketData()` in this manner will retrieve ticket stats for a developer, targeted by that developer's site username.

## Examples

```ts
import { getTicketData } from "@retroachievements/api";

const ticketStats = await getTicketData(authorization, { userName: "xelnia" });
```

## Returns

```json
{
  "user": "MockUser",
  "open": 0,
  "closed": 17,
  "resolved": 27,
  "total": 44,
  "url": "https://retroachievements.org/ticketmanager.php?u=MockUser"
}
```

## Parameters

| Name            | Type                                        | Description                                                                                                                  |
| :-------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `authorization` | [`AuthObject`](/v1/data-models/auth-object) | An object that must contain a `userName` and a `webApiKey`. See [this page](/getting-started) for how to create this object. |
| `userName`      | `string`                                    | The user to retrieve ticket stats for.                                                                                       |

## Source

[@retroachievements/api, getTicketData.ts](https://github.dev/RetroAchievements/api-js/blob/main/src/ticket/getTicketData.ts)  
[RAWeb, API_GetTicketData.php](https://github.dev/RetroAchievements/RAWeb/blob/master/public/API/API_GetTicketData.php)
