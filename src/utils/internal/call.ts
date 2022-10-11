import unfetch from "isomorphic-unfetch";

/**
 * Fetch an HTTP resource. This is publicly exposed in the
 * event you would like to access an endpoint that this
 * library does not currently support.
 *
 * UNLESS YOU'RE SURE OF WHAT YOU'RE DOING, YOU PROBABLY
 * SHOULDN'T USE THIS FUNCTION.
 *
 * 2022-10-09: At the time of writing, Node.js LTS (16.x)
 * does not yet support fetch. As a result, we pull in
 * isomorphic-unfetch for Node.js compatibility. Our support
 * matrix includes 14.x and 16.x.
 *
 * @FIXME - When Node.js 20.x is released, remove the
 * isomorphic-unfetch dependency. At that point we will have
 * two major LTS versions that include a native fetch API.
 */
export const call = async <
  T extends readonly any[] | Record<string, any>
>(config: {
  url: string;
}) => {
  const { url } = config;

  const rawResponse = await unfetch(url);
  return (await rawResponse.json()) as T;
};
