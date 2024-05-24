import type { AuthObject } from "../public/models";

export const buildRequestUrl = (
  baseUrl: string,
  endpointUrl: string,
  authObject: AuthObject,
  args: Record<string, string | number> = {}
) => {
  const concatenated = `${baseUrl}/${endpointUrl}`;
  const withoutDoubleSlashes = concatenated.replaceAll(/([^:]\/)\/+/g, "$1");

  let withArgs = withoutDoubleSlashes;

  // `z` and `y` are expected query params from the RA API.
  // Authentication is handled purely by query params.
  const queryParamValues: Record<string, string> = {
    z: authObject.username,
    y: authObject.webApiKey,
  };

  for (const [argKey, argValue] of Object.entries(args)) {
    // "abc.com/some-route/:foo/some-path" & {"foo": 4} --> "abc.com/some-route/4/some-path"
    if (withArgs.includes(`:${argKey}`)) {
      withArgs = withArgs.replace(`:${argKey}`, String(argValue));
    } else if (argValue !== undefined) {
      queryParamValues[argKey] = String(argValue);
    }
  }

  const queryString = new URLSearchParams(queryParamValues).toString();
  return `${withArgs}?${queryString}`;
};
