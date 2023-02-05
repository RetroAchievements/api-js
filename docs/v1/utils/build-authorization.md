# buildAuthorization

This function accepts your RA username and web API key in a single object argument. The function then returns the same object back to you, however the return value is strongly-typed for your safety. This object is used as the first argument to every function in the API.

Your personal web API key can be found on the Settings page of RetroAchievements.org.

## Examples

```ts
import { buildAuthorization, getGame } from "@retroachievements/api";

// First, build the authorization object.
const authorization = buildAuthorization({
  userName: "Scott",
  webApiKey: "LtjCwW16nJI7cqOyPIQtXk8v1cfF0tmO"
});

// Then use it.
const game = await getGame(authorization, { gameId: 14402 });
```

## Source

[@retroachievements/api, buildAuthorization.ts](https://github.dev/RetroAchievements/retroachievements-api-js/blob/main/src/utils/public/buildAuthorization.ts)
