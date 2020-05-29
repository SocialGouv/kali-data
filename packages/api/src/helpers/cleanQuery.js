// @ts-check

/**
 * Clean query in order to improve fuse-search results.
 *
 * @param {string} query
 *
 * @returns {string}
 */
export default function cleanQuery(query) {
  const cleanedQuery = query
    .toLocaleLowerCase()
    .replace(/[^a-z0-9áâàäéêèëíîìïóôòöúûùüç\s-.]/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s/g, " '");

  return `'${cleanedQuery}`;
}
