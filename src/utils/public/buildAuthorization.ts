import type { AuthObject } from "./models";

/**
 * Accepts your RetroAchievements.org username and web API key. After
 * receiving these inputs, the function returns you a value that can be
 * used for the authentication parameter by any of the async calls in this
 * library.
 *
 * Your account's personal Web API Key can be found on the Settings page
 * of RetroAchievements.org. Do not use a Web API Key that is not associated
 * with your account.
 *
 * @returns An `AuthObject` that you can pass to any of the API call functions.
 *
 * @example
 * ```
 * const authorization = buildAuthorization({
 *   username: "Scott",
 *   webApiKey: "LtjCwW16nJI7cqOyPIQtXk8v1cfF0tmO"
 * });
 * ```
 */
export const buildAuthorization = (options: AuthObject): AuthObject => {
  if (!options.username || !options.webApiKey) {
    throw new Error(`
      buildAuthorization() requires an object containing a
      username and webApiKey. eg:

      const authorization = buildAuthorization({
        username: "myUserName",
        webApiKey: "myWebApiKey"
      })
    `);
  }

  return options;
};

// This function simply returns what it's given, however the return
// value has the added benefit of type safety.
