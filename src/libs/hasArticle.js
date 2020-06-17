// @ts-check

const checkArticleIdOrCid = require("../helpers/checkArticleIdOrCid");
const getArticles = require("./getArticles");

const INDEXED_ARTICLES = getArticles();

/**
 * @param {string} articleIdOrCid
 *
 * @returns {((indexedArticle: KaliData.IndexedArticle) => boolean)}
 */
const withArticleIdOrCid = articleIdOrCid => indexedArticle =>
  indexedArticle.articleId === articleIdOrCid || indexedArticle.articleCid === articleIdOrCid;

/**
 * @param {string} articleIdOrCid
 *
 * @returns {boolean}
 */
function hasArticle(articleIdOrCid) {
  try {
    checkArticleIdOrCid(articleIdOrCid);

    return INDEXED_ARTICLES.find(withArticleIdOrCid(articleIdOrCid)) !== undefined;
  } catch (err) {
    return false;
  }
}

module.exports = hasArticle;
