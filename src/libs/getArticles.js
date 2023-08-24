// @ts-check

const INDEXED_ARTICLES =
    /** @type {KaliData.IndexedArticle[]} */
    (require("../../data/articles/index.json"));

/**
 * Get the full list of indexed articles.
 *
 * @returns {KaliData.IndexedArticle[]}
 */
function getArticles() {
    return INDEXED_ARTICLES;
}

module.exports = getArticles;
