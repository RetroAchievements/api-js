# Getting Started

First, we'll install the package. Then, we'll create an authentication object. After these steps are completed, you are able to use any function provided by the library.

## Quick Start

Install the package:

::: code-group

```bash [npm]
npm install --save @retroachievements/api
```

```bash [yarn]
yarn add @retroachievements/api
```

:::

You will need to be authenticated to use the official RetroAchievements API. To authenticate, follow these steps:

1. Visit [your control panel](https://retroachievements.org/controlpanel.php) on the RA website.

<br />

2. Find the "Keys" section on the page. Copy the web API key value.

::: warning
Store your API key as though it is a secret, like a password. Avoid checking in your API key with your code.
:::

<br />

3. You can now create your authorization object using your web API key.

```ts
import { buildAuthorization } from "@retroachievements/api";

const userName = "<your username on RA>";
const webApiKey = "<your web API key>";

const authorization = buildAuthorization({ userName, webApiKey });
```

<br />

4. You now have all you need to use any function in the API. Each function takes this authorization object as its first argument. Here's an example:

```ts
import { getGame } from "@retroachievements/api";

// This returns basic metadata about the game on this page:
// https://retroachievements.org/game/14402
const game = await getGame(authorization, { gameId: 14402 });
```
