import { http, HttpResponse } from "msw";
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
      http.get(mockRequestUrl, (info) => {
        receivedMethod = info.request.method;
        return HttpResponse.json({ foo: "bar" });
      })
    );

    // ACT
    const response = await call({ url: mockRequestUrl });

    // ASSERT
    expect(response).toEqual({ foo: "bar" });
    expect(receivedMethod).toEqual("GET");
  });

  it("given the call returns an error, throws an error", async () => {
    // ARRANGE
    const mockRequestUrl = "https://abc.xyz/v1/endpoint2";

    server.use(
      http.get(mockRequestUrl, () =>
        HttpResponse.text("<HTML><BODY>something bad happened</BODY></HTML>", {
          status: 503,
        })
      )
    );

    // ASSERT
    await expect(call({ url: mockRequestUrl })).rejects.toThrow();
  });
});
