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
 * Get an indexed article.
 *
 * @param {string} articleIdOrCid
 *
 * @returns {KaliData.IndexedArticle}
 */
function getIndexedArticle(articleIdOrCid) {
  checkArticleIdOrCid(articleIdOrCid);

  const maybeIndexedArticle = INDEXED_ARTICLES.find(withArticleIdOrCid(articleIdOrCid));
  if (maybeIndexedArticle === undefined) {
    throw new Error(`No agreement article found with this ID or CID (${articleIdOrCid}).`);
  }

  return maybeIndexedArticle;
}

module.exports = getIndexedArticle;
