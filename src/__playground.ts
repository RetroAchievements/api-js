/**
 * PLEASE ONLY COMMIT CHANGES TO THIS FILE IF YOU WANT THEM
 * TO DIRECTLY IMPACT EVERY DEV WORKING ON THE PROJECT.
 *
 * Use this file to test and experiment with changes to the project.
 * If changes to this file land in a PR, you probably did something wrong.
 */

// ---

/**
 * "./index" is the library's single public-facing export.
 * In other words, if you're not able to import what you want
 * to use from "./index", no one who uses the package will be
 * able to either.
 */
import { buildAuthorization, getAchievementCount } from "./index";

// MODIFY THESE VALUES.
const username = "myUsername";
const webApiKey = "myWebApiKey";

const main = async () => {
  console.log("🚀  @retroachievements/api playground is running.\n");

  // -- Start testing stuff here --

  if (username === "myUsername" || webApiKey === "myWebApiKey") {
    console.error(
      "⛔️  ERROR: In __playground.ts, modify the username and webApiKey variables to match your RA credentials.\n"
    );
  }

  const authorization = buildAuthorization({ username, webApiKey });

  const achievementCount = await getAchievementCount(authorization, {
    gameId: 14_402,
  });
  console.log(achievementCount);
};

main();
