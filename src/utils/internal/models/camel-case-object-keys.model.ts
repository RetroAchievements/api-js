// This is a utility type we'll leverage but not actually export
// to the library consumer. Unfortunately, the RA API sends back
// responses in PascalCase, not camelCase. This means we need to
// convert all the responses to camelCase and type them correctly.

type CamelCaseKeys<T extends object> = Uncapitalize<keyof T & string>;

export type CamelCaseObjectKeys<T extends object> = {
  [key in CamelCaseKeys<T>]: Capitalize<key> extends keyof T
    ? T[Capitalize<key>]
    : never;
};
