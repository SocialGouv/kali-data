// @ts-check

/**
 * Smarten query in order to specifically improve fuse-search results within an agreement articles.
 *
 * @param {string} query
 *
 * @returns {string}
 */
export default function smartenArticleQuery(query) {
  switch (true) {
    case /'article '(\d{1,2}\.)+\d{1,2}/i.test(query):
      return query.replace(/'article '((\d{1,2}\.)+\d{1,2})/i, "'» article $1$");

    case /'article '\d{1,2}(?=( |$))/i.test(query):
      return query.replace(/'article '(\d{1,2})(?=( |$))/i, "'» article $1$");

    case /'(\d{1,2}\.)+\d{1,2}/i.test(query):
      return query.replace(/'((\d{1,2}\.)+\d{1,2})/, "'» article $1$");

    case /'\d{1,2}(?=( |$))/i.test(query):
      return query.replace(/'(\d{1,2})(?=( |$))/, "'» article $1$");

    default:
      return query;
  }
}
