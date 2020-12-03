/**
 * Normalize API Collection for the state reducer
 * @param {Object} collection
 */

export const normalizeCollection = (collection) => {
  if (!collection.metadata) {
    collection.metadata = {
      total_entries: 0, /* eslint-disable-line camelcase */
      total_pages: 1, /* eslint-disable-line camelcase */
      per_page: 15 /* eslint-disable-line camelcase */
    };
  }

  let metadata = {
    totalEntries: collection.metadata.total_entries,
    totalPages: collection.metadata.total_pages,
    perPage: collection.metadata.per_page,
    scope: collection.metadata.scope,
    lastUpdate: Date.now()
  };

  return {
    results: collection.results || [],
    metadata
  };
};
