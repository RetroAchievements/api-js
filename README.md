<h1 align="center">@retroachievements/api</h1>

<p align="center">
  <i>A JavaScript library that lets you get achievement, user, and game data from RetroAchievements.</i>
  <br /><br />
</p>

<p align="center">
  <a href="https://retroachievements-api-js.vercel.app/getting-started.html"><strong>Documentation: Get Started</strong></a>
  <br />
</p>

<hr />

## Features

✅ &nbsp;Modular by design and supports tree-shaking.  
✅ &nbsp;Officially-supported, aligns 1:1 with the RAWeb API.  
✅ &nbsp;Backwards-compatible, easy migration path to API v2.  
✅ &nbsp;Supports Node environments (16 and above).  
✅ &nbsp;Ships with TypeScript support and types.  
✅ &nbsp;Correctly maps types and properties from RAWeb PHP calls.  
✅ &nbsp;Small, <3Kb.

<hr />

## Documentation

Learn how to authenticate and start pulling data from RetroAchievements on our documentation website.

- [Get started](https://retroachievements-api-js.vercel.app/getting-started.html)
- [Get a user's profile information](https://retroachievements-api-js.vercel.app/v1/users/get-user-summary.html)
- [Look up games a user has completed](https://retroachievements-api-js.vercel.app/v1/users/get-user-completed-games.html)
- [Get a game's metadata](https://retroachievements-api-js.vercel.app/v1/games/get-game-extended.html)

## Installation

Run the following command:

```bash
npm install --save @retroachievements/api
```

## How to begin making API calls

To use any endpoint function in the API, you must first be authorized by RetroAchievements. Fortunately, this is a fairly straightforward process.

1. Visit [your control panel](https://retroachievements.org/controlpanel.php) on the RA website.

2. Find the "Keys" section on the page. Copy the web API key value. **Do not expose your API key anywhere publicly.**

3. You can now create your authorization object using your web API key.

```ts
import { buildAuthorization } from "@retroachievements/api";

const userName = "<your username on RA>";
const webApiKey = "<your web API key>";

const authorization = buildAuthorization({ userName, webApiKey });
```

4. You now have all you need to use any function in the API. Each function takes this authorization object as its first argument. Here's an example:

```ts
import { getGame } from "@retroachievements/api";

// This returns basic metadata about the game on this page:
// https://retroachievements.org/game/14402
const game = await getGame(authorization, { gameId: 14402 });
```

## API

Click the function names to open their complete docs on the docs site.

### Users

- [`getAchievementsEarnedBetween()`](https://retroachievements-api-js.vercel.app/v1/users/get-achievements-earned-between.html) - Get a list of achievements earned by a user between two dates.
- [`getAchievementsEarnedOnDay()`](https://retroachievements-api-js.vercel.app/v1/users/get-achievements-earned-on-day.html) - Get a list of achievements earned by a user on a given date.
- [`getGameInfoAndUserProgress()`](https://retroachievements-api-js.vercel.app/v1/users/get-game-info-and-user-progress.html) - Get metadata about a game as well as a user's progress on that game.
- [`getUserClaims()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-claims.html) - Get a list of set claims made over the lifetime of a user.
- [`getUserCompletedGames()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-completed-games.html) - Get hardcore and softcore completion metadata about games a user has played.
- [`getUserGameRankAndScore()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-game-rank-and-score.html) - Get metadata about how a user has performed on a given game.
- [`getUserPoints()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-points.html) - Get a user's total hardcore and softcore points.
- [`getUserProgress()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-progress.html) - Get a user's progress on a list of specified games.
- [`getUserRecentlyPlayedGames()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-recently-played-games.html) - Get a list of games a user has recently played.
- [`getUserSummary()`](https://retroachievements-api-js.vercel.app/v1/users/get-user-summary.html) - Get a user's profile metadata.

### Games

- [`getAchievementCount()`](https://retroachievements-api-js.vercel.app/v1/games/get-achievement-count.html) - Get the list of achievement IDs for a game.
- [`getAchievementDistribution()`](https://retroachievements-api-js.vercel.app/v1/games/get-achievement-distribution.html) - Get how many players have unlocked how many achievements for a game.
- [`getGame()`](https://retroachievements-api-js.vercel.app/v1/games/get-game.html) - Get basic metadata about a game.
- [`getGameExtended()`](https://retroachievements-api-js.vercel.app/v1/games/get-game-extended.html) - Get extended metadata about a game.
- [`getGameRankAndScore()`](https://retroachievements-api-js.vercel.app/v1/games/get-game-rank-and-score.html) - Get a list of either the latest masters or highest points earners for a game.
- [`getGameRating()`](https://retroachievements-api-js.vercel.app/v1/games/get-game-rating.html) - Get how users have rated a game.

### Achievements

- [`getAchievementUnlocks()`](https://retroachievements-api-js.vercel.app/v1/achievements/get-achievement-unlocks.html) - Get a list of users who have earned an achievement.

### Consoles

- [`getConsoleIds()`](https://retroachievements-api-js.vercel.app/v1/consoles/get-console-ids.html) - Get the complete list of console ID and name pairs on the site.
- [`getGameList()`](https://retroachievements-api-js.vercel.app/v1/consoles/get-game-list.html) - Get the complete list of games for a console.

### Feed

- [`getAchievementOfTheWeek()`](https://retroachievements-api-js.vercel.app/v1/feed/get-achievement-of-the-week.html) - Get comprehensive metadata about the current Achievement of the Week.
- [`getActiveClaims()`](https://retroachievements-api-js.vercel.app/v1/feed/get-active-claims.html) - Get all current set claims on the site.
- [`getTopTenUsers()`](https://retroachievements-api-js.vercel.app/v1/feed/get-top-ten-users.html) - Get the list of top ten points earners.

### Tickets

- [Get Ticket by ID](https://retroachievements-api-js.vercel.app/v1/tickets/get-ticket-by-id.html)
- [Get Most Ticketed Games](https://retroachievements-api-js.vercel.app/v1/tickets/get-most-ticketed-games.html)
- [Get Most Recent Tickets](https://retroachievements-api-js.vercel.app/v1/tickets/get-most-recent-tickets.html)
- [Get Game Ticket Stats](https://retroachievements-api-js.vercel.app/v1/tickets/get-game-ticket-stats.html)
- [Get Developer Ticket Stats](https://retroachievements-api-js.vercel.app/v1/tickets/get-developer-ticket-stats.html)

## Examples

TODO

## Projects Using @retroachievements/api

Let us know about yours by [opening an issue](https://github.com/RetroAchievements/retroachievements-api-js/issues/new)!

## How to Contribute

Check out [CONTRIBUTING.md](https://github.com/RetroAchievements/retroachievements-api-js/blob/main/CONTRIBUTING.md) for how to get started.

## Contributors

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/wescopeland"><img src="https://avatars.githubusercontent.com/u/3984985?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wes Copeland</b></sub></a><br /><a href="https://github.com/achievements-app/psn-api/commits?author=wescopeland" title="Code">💻</a> <a href="#example-wescopeland" title="Examples">💡</a> <a href="https://github.com/achievements-app/psn-api/commits?author=wescopeland" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>
