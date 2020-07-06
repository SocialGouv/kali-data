// @ts-check

const unistUtilFlatFilter = require("unist-util-flat-filter");

const getAgreement = require("./getAgreement");
const getIndexedArticle = require("./getIndexedArticle");

/**
 * Get a flat unist array of all the articles an agreement contains.
 * Each article includes its parent sections path, as an ordered list of their titles.
 *
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {KaliData.AgreementArticleWithPath[]}
 */
function getAgreementArticlesWithPath(agreementIdOrIdcc) {
  const agreement = getAgreement(agreementIdOrIdcc);

  const rootedArticles =
    /** @type {{ children: KaliData.AgreementArticle[], type: "root" }} */
    (/** @type {*} */ (unistUtilFlatFilter(agreement, { type: "article" })));

  const articlesWithPath = rootedArticles.children.map(article => ({
    ...article,
    path: getIndexedArticle(article.data.cid).path,
  }));

  return articlesWithPath;
}

module.exports = getAgreementArticlesWithPath;
