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

const naiveCamelCase = (originalValue: string) => {
  return `${originalValue.charAt(0).toLowerCase()}${originalValue.slice(1)}`;
};
