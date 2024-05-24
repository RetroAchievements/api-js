import { buildAuthorization } from "./buildAuthorization";

describe("Util: buildAuthorization", () => {
  it("is defined #sanity", () => {
    // ASSERT
    expect(buildAuthorization).toBeDefined();
  });

  it("returns the same object it is given", () => {
    // ARRANGE
    const myAuth = {
      username: "myUserName",
      webApiKey: "myWebApiKey",
    };

    // ACT
    const authorization = buildAuthorization(myAuth);

    // ASSERT
    expect(authorization).toEqual(myAuth);
  });

  it("throws an error if missing a username", () => {
    // ASSERT
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - We're assuming the user is not using a TypeScript project.
    expect(() => buildAuthorization({ webApiKey: "mockWebApiKey" })).toThrow();
  });

  it("throws an error if missing a webApiKey", () => {
    // ASSERT
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - We're assuming the user is not using a TypeScript project.
    expect(() => buildAuthorization({ username: "mockUserName" })).toThrow();
  });
});
