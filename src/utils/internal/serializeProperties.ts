/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/prefer-immediate-return */

export const serializeProperties = (
  originalData: any,
  options: Partial<{
    shouldCastToNumbers: string[];
    shouldMapToBooleans: string[];
  }> = {}
) => {
  const { shouldCastToNumbers, shouldMapToBooleans } = options;

  let returnValue = originalData;

  if (Array.isArray(originalData)) {
    const cleanedArray: any[] = [];

    for (const entity of originalData) {
      cleanedArray.push(serializeProperties(entity, options));
    }

    returnValue = cleanedArray;
  } else if (!Array.isArray(originalData) && originalData instanceof Object) {
    let cleanedObject: Record<string, any> = {};

    for (const [originalKey, originalValue] of Object.entries(originalData)) {
      let sanitizedValue = originalValue;
      if (shouldCastToNumbers?.includes(originalKey)) {
        sanitizedValue = originalValue === null ? null : Number(originalValue);
      }

      if (shouldMapToBooleans?.includes(originalKey)) {
        if (originalValue === null) {
          sanitizedValue = null;
        } else {
          sanitizedValue = originalValue === "1" ? true : false;
        }
      }

      cleanedObject = {
        ...cleanedObject,
        [naiveCamelCase(originalKey)]: serializeProperties(
          sanitizedValue,
          options
        )
      };
    }

    returnValue = cleanedObject;
  }

  return returnValue;
};

const naiveCamelCase = (originalValue: string) => {
  // "ID" --> "id", "URL" --> "url"
  if (originalValue.toUpperCase() === originalValue) {
    return originalValue.toLowerCase();
  }

  // "GameID" -> "gameID"
  let camelCased =
    originalValue.charAt(0).toLowerCase() + originalValue.slice(1);

  // "gameID" -> "gameId"
  camelCased = camelCased.replace(/ID/g, "Id");

  // "badgeURL" --> "badgeUrl"
  camelCased = camelCased.replace(/URL/g, "Url");

  // "rAPoints" -> "raPoints"
  camelCased = camelCased.replace(/rA/g, "ra");

  return camelCased;
};
