/* eslint-disable sonarjs/prefer-immediate-return */

import type { CamelCaseObjectKeys } from "./models";

/**
 * Given an object, iterate over its keys and convert them from
 * PascalCase to camelCase.
 */
export const camelCaseKeys = <T extends object>(originalValue: T) => {
  const newObject: any = {};

  for (const [key, value] of Object.entries(originalValue)) {
    const camelCasedKey = naiveCamelCase(key);
    newObject[camelCasedKey] = value;

    if (typeof value === "object" && !Array.isArray(value)) {
      const sanitizedNestedObject: any = {};

      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        const nestedCamelCasedKey = naiveCamelCase(nestedKey);
        sanitizedNestedObject[nestedCamelCasedKey] = nestedValue;
      }

      newObject[camelCasedKey] = sanitizedNestedObject;
    }
  }

  return newObject as CamelCaseObjectKeys<T>;
};

// Perform a handful of hacky operations to get us close to camelCase.
const naiveCamelCase = (originalValue: string) => {
  // "GameID" --> "gameID"
  const withFirstToLowerCase = `${originalValue
    .charAt(0)
    .toLowerCase()}${originalValue.slice(1)}`;

  // "ID" --> "Id"
  const withCamelizedId = withFirstToLowerCase.replace(/ID/g, "Id");

  // "iD" --> "id"
  const withLowerCaseIdFixed = withCamelizedId.replace(/iD/g, "id");

  return withLowerCaseIdFixed;
};
