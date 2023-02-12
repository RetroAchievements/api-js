# Contributing

Before beginning, please make sure you have the following tools installed.

- Node.js (the latest LTS release, [download](https://nodejs.org/en/download/))
- yarn classic (1.x, [instructions](https://yarnpkg.com/lang/en/docs/install/))

## Installation

```bash
git clone https://github.com/retroachievements/retroachievements-api-js.git
cd retroachievements-api-js
yarn
```

## Local development

This project includes a `__playground.ts` file for testing any local changes. To get started, open the file and replace these lines with values pertinent to your user account on RetroAchievements:

```ts
const userName = "myUserName";
const webApiKey = "myWebApiKey";
```

You can now modify the playground file how you see fit to test your changes. To run the file in watch mode, execute the following command in your terminal:

```bash
yarn dev
```

## Commit messages

This project uses linted commit messages. While this can be annoying, releases are automatically cut based on the kind of commit you write. This ensures major, minor, and patch releases are versioned correctly on npm. We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

Example commit messages:

```
"fix: remediate issue in getActiveClaims()"
"feat: add new getUserExtendedSummary() function"
"docs: update getUserSummary page"
"test: increase coverage for some functions"
```

Based on the type (the word before the colon), the release can be correctly versioned. For example, a commit message with the word "fix" will automatically be understood that a patch release (x.x.1) should be cut. A commit message with the word "feat" will automatically be understood that a minor release (x.1.x) should be cut.

## Code Formatting and Linting

Prettier is used for code style. ESLint with a strict set of anti-code smell rules is used for linting. All ESLint rules have automatic fixers so you don't have to stress about what rules your code follows.

To manually run Prettier, do:

```bash
yarn format:write
```

To manually run ESLint, do:

```bash
yarn lint:fix
```

This works but is cumbersome. It is recommended that you set your editor to run Prettier and ESLint automatically on save.

[How to set up Prettier auto-format on save for VSCode](https://khalilstemmler.com/blogs/tooling/prettier/#Formatting-using-VSCode-on-save-recommended)
[How to set up ESLint auto-fix on save for VSCode](https://www.digitalocean.com/community/tutorials/workflow-auto-eslinting#step-4-adding-code-actions-on-save)

## Tests

Given that this library is an official reference implementation, we strive for high code coverage. New code should always have tests to accompany it.

To run the current suite of tests, in the terminal execute:

```bash
yarn test
```

If you're actively writing tests, you can use watch mode like:

```bash
yarn test --watch
```

Take note of the [ARRANGE, ACT, ASSERT pattern](https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-12-structure-tests-by-the-aaa-pattern) followed throughout the testing suite and be sure to use it in any new tests so they are easy to understand for future maintainers.

## Building

This project uses [microbundle](https://github.com/developit/microbundle) for builds. This was specifically chosen over other solutions due to microbundle's special optimizations for packaging libraries (vs a solution like Vite which is built more for apps).

You can build the app using:

```bash
yarn build
```

## Documentation Website

We use VitePress for the docs site. You can start VitePress locally using:

```bash
yarn docs:dev
```

## Opening a PR

Before opening a PR, the following are good things to check for:

- Does `yarn verify` pass successfully?
- Does any new code have tests?
- Is new code documented on the VitePress site?

## How to release to npm

If you are a RetroAchievements org member, you should be able to release a new package to npm.

1. Change the package version number in _package.json_. Respect semantic versioning: [major].[minor].[patch]. A major release usually assumes breaking changes.

2. Run `yarn build`.

3. Run `npm publish --access public`.
