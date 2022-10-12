/* eslint-disable sonarjs/prefer-immediate-return */

import type { CamelCasedPropertiesDeep } from "type-fest";

/**
 * Given an object, iterate over its keys and convert them from
 * PascalCase to camelCase.
 */
export const camelCaseKeys = <T extends object>(originalValue: T) => {
  const newObject: any = {};

  if (Array.isArray(originalValue)) {
    const camelizedArray = [];

    for (const entity of originalValue) {
      const camelizedEntity: any = camelCaseKeys(entity);
      camelizedArray.push(camelizedEntity);
    }

    return camelizedArray as CamelCasedPropertiesDeep<T>;
  } else if (typeof originalValue === "object") {
    for (const [key, value] of Object.entries(originalValue)) {
      const camelCasedKey = naiveCamelCase(key);
      newObject[camelCasedKey] = camelCaseKeys(value);
    }

    return newObject as CamelCasedPropertiesDeep<T>;
  }

  return originalValue as CamelCasedPropertiesDeep<T>;
};

// Perform a handful of hacky operations to get us close to camelCase.
const naiveCamelCase = (originalValue: string) => {
  // "GameID" --> "gameID"
  const withFirstToLowerCase = `${originalValue
    .charAt(0)
    .toLowerCase()}${originalValue.slice(1)}`;

  // "iD" --> "id"
  const withLowerCaseIdFixed = withFirstToLowerCase.replace(/iD/g, "id");

  return withLowerCaseIdFixed;
};
