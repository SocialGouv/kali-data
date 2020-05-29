// @ts-check

const INDEXED_ARTICLES =
  /** @type {KaliData.IndexedArticle[]} */
  (require("../../articles/index.json"));

/**
 * @returns {KaliData.IndexedArticle[]}
 */
function getArticles() {
  return INDEXED_ARTICLES;
}

module.exports = getArticles;
