// @ts-check

const getAgreement = require("./getAgreement");
const getArticles = require("./getArticles");
const unistUtilFind = require("unist-util-find");

const INDEXED_ARTICLES = getArticles();

/**
 * Get an agreement article unist node with its parent sections.
 *
 * @param {string} articleId
 *
 * @returns {KaliData.AgreementArticleWithParentSections}
 *
 * TODO Replace this dirty "let" by a clean recursive function.
 */
function getArticleWithParentSections(articleId) {
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

  /** @type {KaliData.AgreementArticleWithParentSections} */
  const articleWithParentSections = { ...node, sections: [] };
  while (node) {
    const clonedNode = { ...node };
    delete clonedNode.children;
    delete clonedNode.parent;
    articleWithParentSections.sections.unshift(clonedNode);

    node = node.parent;
  }
  // Remove the article itself from the sections pile:
  articleWithParentSections.sections.pop();

  return articleWithParentSections;
}

module.exports = getArticleWithParentSections;
