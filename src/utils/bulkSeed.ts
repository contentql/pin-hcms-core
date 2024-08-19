import { CollectionSlug, DataFromCollectionSlug, Payload } from 'payload'

/**
 * Seeds multiple items into a specified collection using the Payload client.
 * The function creates each item in the collection and handles both successful and failed operations.
 * It returns an array where each element is either a successfully created item or an error message.
 *
 * @param {Payload} payload - The Payload client instance used to interact with the Payload API.
 * @param {CollectionSlug} collection - The name of the collection to seed data into.
 * @param {Omit<T, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[]} data - An array of items to be seeded, excluding fields that are automatically managed by Payload.
 *
 * @returns {Promise<(T | string)[]>} - A promise that resolves to an array of results where each element is either a successfully created item or an error message.
 *
 * @throws {Error} - Throws an error if the `payload.create` operation fails for any item. Each failed operation is captured and returned as an error message in the results array.
 *
 * @example
 * ```
 * const result = await bulkSeedCollection(payload, 'blogs', blogsData);
 * console.log(result);
 * // The result will be an array of created blog items or error messages for each failed item.
 * ```
 */
export const bulkSeed = async <
  T extends DataFromCollectionSlug<CollectionSlug>,
>(
  payload: Payload,
  collection: CollectionSlug,
  data: Omit<T, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>[],
): Promise<(T | string)[]> => {
  const results = await Promise.allSettled(
    data.map(item =>
      payload.create({
        collection,
        data: item,
      }),
    ),
  )

  return results.map(result =>
    result.status === 'fulfilled'
      ? (result.value as T)
      : `Failed to seed: ${result.reason}`,
  )
}
