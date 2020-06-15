// @ts-check

const checkArticleId = require("../helpers/checkArticleId");
const getArticles = require("./getArticles");

const INDEXED_ARTICLES = getArticles();

/**
 * @param {string} articleId
 *
 * @returns {boolean}
 */
function hasArticle(articleId) {
  try {
    checkArticleId(articleId);

    return (
      INDEXED_ARTICLES.find(indexedArticle => indexedArticle.articleId === articleId) !== undefined
    );
  } catch (err) {
    return false;
  }
}

module.exports = hasArticle;
