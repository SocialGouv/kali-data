// @ts-check

const unistUtilFind = require("unist-util-find");

const getAgreement = require("./getAgreement");
const getIndexedArticle = require("./getIndexedArticle");

/**
 * @param {KaliData.Agreement} agreement
 * @param {Partial<KaliData.AgreementArticleData>} data
 *
 * @returns {KaliData.AgreementArticle=}
 */
const findArticleWithData = (agreement, data) =>
  unistUtilFind(agreement, {
    data,
    type: "article",
  });

/**
 * Get an agreement article unist node with its parent sections path.
 * The parent sections path is represented as an ordered array of their titles.
 *
 * @param {string} articleIdOrCid
 *
 * @returns {KaliData.AgreementArticleWithPath}
 */
function getArticleWithPath(articleIdOrCid) {
  const { agreementId, path } = getIndexedArticle(articleIdOrCid);
  const agreement = getAgreement(agreementId);

  // First attempt with an article ID:
  const maybeArticleWithId = findArticleWithData(agreement, { id: articleIdOrCid });
  if (maybeArticleWithId !== undefined) {
    const articleWithPath = {
      ...maybeArticleWithId,
      path,
    };

    return articleWithPath;
  }

  // Second attempt with an article CID:
  const maybeArticleWithCid = findArticleWithData(agreement, { cid: articleIdOrCid });
  if (maybeArticleWithCid === undefined) {
    throw new Error(`No agreement article found with this ID or CID (${articleIdOrCid}).`);
  }

  const articleWithPath = {
    ...maybeArticleWithCid,
    path,
  };

  return articleWithPath;
}

module.exports = getArticleWithPath;
