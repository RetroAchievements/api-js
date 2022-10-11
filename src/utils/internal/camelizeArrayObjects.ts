import { camelCaseKeys } from "./camelCaseKeys";
import type { CamelCaseObjectKeys } from "./models";

export const camelizeArrayObjects = <T extends object>(
  originalArray: readonly T[]
) => {
  const camelizedArray: CamelCaseObjectKeys<T>[] = [];

  for (const entity of originalArray) {
    camelizedArray.push(camelCaseKeys(entity));
  }

  return camelizedArray;
};
