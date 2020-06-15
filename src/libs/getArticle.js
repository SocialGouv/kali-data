// @ts-check

const getAgreement = require("./getAgreement");
const getArticles = require("./getArticles");
const unistUtilFind = require("unist-util-find");

const INDEXED_ARTICLES = getArticles();

/**
 * @param {string} articleId
 *
 * @returns {KaliData.AgreementArticleWithSections}
 *
 * TODO Replace this dirty "let" by a clean recursive function.
 */
function getArticle(articleId) {
  const maybeIndexedArticle = INDEXED_ARTICLES.find(
    indexedArticle => indexedArticle.articleId === articleId,
  );
  if (maybeIndexedArticle === undefined) {
    throw new Error(`No agreement article found with this ID (${articleId}).`);
  }

  const agreementId = maybeIndexedArticle.agreementId;
  const agreement = getAgreement(agreementId);

  let node = unistUtilFind(agreement, { data: { id: articleId }, type: "article" });
  if (node === undefined) {
    throw new Error(`No agreement article found with this ID (${articleId}).`);
  }

  /** @type {KaliData.AgreementArticleWithSections} */
  const articleWithSections = { ...node, sections: [] };
  while (node) {
    const clonedNode = { ...node };
    delete clonedNode.children;
    delete clonedNode.parent;
    articleWithSections.sections.unshift(clonedNode);

    node = node.parent;
  }
  // Remove the article itself from the sections pile:
  articleWithSections.sections.pop();

  return articleWithSections;
}

module.exports = getArticle;
