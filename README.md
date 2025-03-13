<p align="center" dir="auto"><a href="https://retroachievements.org" rel="nofollow"><img src="https://raw.githubusercontent.com/RetroAchievements/RAWeb/master/public/assets/images/ra-icon.webp" width="200" alt="RetroAchievements Logo" style="max-width: 100%;"></a></p>
<h1 align="center">@retroachievements/api</h1>

<p align="center">
  <i>A JavaScript library that lets you get achievement, user, and game data from RetroAchievements.</i>
  <br /><br />
</p>

<p align="center">
  <a href="https://api-docs.retroachievements.org/getting-started.html"><strong>Documentation: Get Started</strong></a>
  <br />
</p>

<hr />

## Features

✅ &nbsp;Modular by design and supports tree-shaking.  
✅ &nbsp;Officially-supported, aligns 1:1 with the RAWeb API.  
✅ &nbsp;Supports Node environments (16 and above).  
✅ &nbsp;Ships with TypeScript support and types.  
✅ &nbsp;Automatically maps types and properties from RAWeb PHP calls.  
✅ &nbsp;Small, <3Kb.

<hr />

## Installation

Run the following command:

```bash
npm install --save @retroachievements/api
```

## Documentation

Learn how to authenticate and start pulling data from RetroAchievements on our documentation website.

- [Get started](https://api-docs.retroachievements.org/getting-started.html)
- [Get a user's profile information](https://api-docs.retroachievements.org/v1/get-user-profile.html)
- [Look up games a user has completed](https://api-docs.retroachievements.org/v1/get-user-progress.html)
- [Get a game's metadata](https://api-docs.retroachievements.org/v1/get-game-extended.html)

## How to begin making API calls

To use any endpoint function in the API, you must first be authorized by RetroAchievements. Fortunately, this is a fairly straightforward process.

1. Visit [your control panel](https://retroachievements.org/controlpanel.php) on the RA website.

2. Find the "Keys" section on the page. Copy the web API key value. **Do not expose your API key anywhere publicly.**

3. You can now create your authorization object using your web API key.

```ts
import { buildAuthorization } from "@retroachievements/api";

const username = "<your username on RA>";
const webApiKey = "<your web API key>";

const authorization = buildAuthorization({ username, webApiKey });
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

### User

- [`getUserProfile()`](https://api-docs.retroachievements.org/v1/get-user-profile.html) - Get a user's basic profile information.
- [`getUserRecentAchievements()`](https://api-docs.retroachievements.org/v1/get-user-recent-achievements.html) - Get a list of achievements recently earned by the user.
- [`getAchievementsEarnedBetween()`](https://api-docs.retroachievements.org/v1/get-achievements-earned-between.html) - Get a list of achievements earned by a user between two dates.
- [`getAchievementsEarnedOnDay()`](https://api-docs.retroachievements.org/v1/get-achievements-earned-on-day.html) - Get a list of achievements earned by a user on a given date.
- [`getGameInfoAndUserProgress()`](https://api-docs.retroachievements.org/v1/get-game-info-and-user-progress.html) - Get metadata about a game as well as a user's progress on that game.
- [`getUserCompletionProgress()`](https://api-docs.retroachievements.org/v1/get-user-completion-progress.html) - Get metadata about all the user's played games and any awards associated with them.
- [`getUserAwards()`](https://api-docs.retroachievements.org/v1/get-user-awards.html) - Get a list of a user's site awards/badges.
- [`getUserClaims()`](https://api-docs.retroachievements.org/v1/get-user-claims.html) - Get a list of set development claims made over the lifetime of a user.
- [`getUserGameRankAndScore()`](https://api-docs.retroachievements.org/v1/get-user-game-rank-and-score.html) - Get metadata about how a user has performed on a given game.
- [`getUserPoints()`](https://api-docs.retroachievements.org/v1/get-user-points.html) - Get a user's total hardcore and softcore points.
- [`getUserProgress()`](https://api-docs.retroachievements.org/v1/get-user-progress.html) - Get a user's progress on a list of specified games.
- [`getUserRecentlyPlayedGames()`](https://api-docs.retroachievements.org/v1/get-user-recently-played-games.html) - Get a list of games a user has recently played.
- [`getUserSummary()`](https://api-docs.retroachievements.org/v1/get-user-summary.html) - Get a user's profile metadata.
- [`getUserCompletedGames()`](https://api-docs.retroachievements.org/v1/get-user-completed-games.html) - Deprecated function. Get hardcore and softcore completion metadata about games a user has played.
- [`getUserWantToPlayList()`](https://api-docs.retroachievements.org/v1/get-user-want-to-play-list.html) - Get a user's "Want to Play Games" list.

### Game

- [`getGame()`](https://api-docs.retroachievements.org/v1/get-game.html) - Get basic metadata about a game.
- [`getGameExtended()`](https://api-docs.retroachievements.org/v1/get-game-extended.html) - Get extended metadata about a game.
- [`getGameHashes()`](https://api-docs.retroachievements.org/v1/get-game-hashes.html) - Get a list of hashes linked to a game.
- [`getAchievementCount()`](https://api-docs.retroachievements.org/v1/get-achievement-count.html) - Get the list of achievement IDs for a game.
- [`getAchievementDistribution()`](https://api-docs.retroachievements.org/v1/get-achievement-distribution.html) - Get how many players have unlocked how many achievements for a game.
- [`getGameRankAndScore()`](https://api-docs.retroachievements.org/v1/get-game-rank-and-score.html) - Get a list of either the latest masters or highest hardcore points earners for a game.

### System

- [`getConsoleIds()`](https://api-docs.retroachievements.org/v1/get-console-ids.html) - Get the complete list of console ID and name pairs on the site.
- [`getGameList()`](https://api-docs.retroachievements.org/v1/get-game-list.html) - Get the complete list of games for a console.

### Achievement

- [`getAchievementUnlocks()`](https://api-docs.retroachievements.org/v1/get-achievement-unlocks.html) - Get a list of users who have earned an achievement.

### Feed

- [`getActiveClaims()`](https://api-docs.retroachievements.org/v1/get-active-claims.html) - Get all active set claims on the site.
- [`getClaims()`](https://api-docs.retroachievements.org/v1/get-claims.html) - Get all claims of other kinds on the site.
- [`getRecentGameAwards()`](https://api-docs.retroachievements.org/v1/get-recent-game-awards.html) - Get all recent mastery, completion, and beaten awards earned on the site.
- [`getTopTenUsers()`](https://api-docs.retroachievements.org/v1/get-top-ten-users.html) - Get the list of top ten points earners.

### Comment

- [`getComments()`](https://api-docs.retroachievements.org/v1/get-comments.html) - Get the comments left an achievement, game, or user wall.

### Event

- [`getAchievementOfTheWeek()`](https://api-docs.retroachievements.org/v1/get-achievement-of-the-week.html) - Get comprehensive metadata about the current Achievement of the Week.

### Ticket

- [Get Ticket by ID](https://api-docs.retroachievements.org/v1/get-ticket-data/get-ticket-by-id.html)
- [Get Most Ticketed Games](https://api-docs.retroachievements.org/v1/get-ticket-data/get-most-ticketed-games.html)
- [Get Most Recent Tickets](https://api-docs.retroachievements.org/v1/get-ticket-data/get-most-recent-tickets.html)
- [Get Game Ticket Stats](https://api-docs.retroachievements.org/v1/get-ticket-data/get-game-ticket-stats.html)
- [Get Developer Ticket Stats](https://api-docs.retroachievements.org/v1/get-ticket-data/get-developer-ticket-stats.html)
- [Get Achievement Ticket Stats](https://api-docs.retroachievements.org/v1/get-ticket-data/get-achievement-ticket-stats.html)

## Projects Using @retroachievements/api

Let us know about yours by [opening an issue](https://github.com/RetroAchievements/api-js/issues/new)!

## How to Contribute

Check out [CONTRIBUTING.md](https://github.com/RetroAchievements/api-js/blob/main/CONTRIBUTING.md) for how to get started.
