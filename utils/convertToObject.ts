/**
 * Converts Mongoose lean document to a serializable object by calling `toString` on properties
 * that have both `toJSON` and `toString` methods.
 *
 * @param leanDocument - The lean document to be converted.
 * @returns The converted serializable object.
 */
export const convertToSerializableObject = (leanDocument: Record<string, any>) => {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString)
      leanDocument[key] = leanDocument[key].toString();
  }
  return leanDocument;
};
