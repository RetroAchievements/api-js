import { buildRequestUrl } from "./buildRequestUrl";

describe("Util: buildRequestUrl", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(buildRequestUrl).toBeDefined();
  });

  it("given a baseUrl, endpointUrl, and some arguments, returns a correctly-constructed URL", () => {
    // ARRANGE
    const baseUrl = "https://retroachievements.org/API/";
    const endpointUrl = "/:baz/API_GetConsoleIDs.php";

    const args = {
      baz: "myBazValue",
      limit: 10,
      offset: 2,
      notDefined: undefined,
    };

    // ACT
    const requestUrl = buildRequestUrl(
      baseUrl,
      endpointUrl,
      { username: "TestUser", webApiKey: "mockWebApiKey" },
      args as any
    );

    // ASSERT
    expect(requestUrl).toEqual(
      "https://retroachievements.org/API/myBazValue/API_GetConsoleIDs.php?z=TestUser&y=mockWebApiKey&limit=10&offset=2"
    );
  });

  it("given no arguments, returns a correctly-constructed URL", () => {
    // ARRANGE
    const baseUrl = "https://retroachievements.org/API/";
    const endpointUrl = "/:baz/API_GetConsoleIDs.php";

    // ACT
    const requestUrl = buildRequestUrl(baseUrl, endpointUrl, {
      username: "TestUser",
      webApiKey: "mockWebApiKey",
    });

    // ASSERT
    expect(requestUrl).toEqual(
      "https://retroachievements.org/API/:baz/API_GetConsoleIDs.php?z=TestUser&y=mockWebApiKey"
    );
  });
});
