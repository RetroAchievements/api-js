import { rest } from "msw";
import { setupServer } from "msw/node";

import { call } from "./call";

const server = setupServer();

describe("Util: call", () => {
  // MSW Setup
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("is defined #sanity", () => {
    // ASSERT
    expect(call).toBeDefined();
  });

  it("given a url, makes a GET call", async () => {
    // ARRANGE
    let receivedMethod = "";

    const mockRequestUrl = "https://abc.xyz/v1/endpoint";

    server.use(
      rest.get(mockRequestUrl, (req, res, ctx) => {
        receivedMethod = req.method;
        return res(ctx.json({ foo: "bar" }));
      })
    );

    // ACT
    const response = await call({ url: mockRequestUrl });

    // ASSERT
    expect(response).toEqual({ foo: "bar" });
    expect(receivedMethod).toEqual("GET");
  });
});
