// @ts-check

const unistUtilFlatFilter = require("unist-util-flat-filter");

const getAgreement = require("./getAgreement");
const getArticleWithParentSections = require("./getArticleWithParentSections");

/**
 * Get a flat unist array of all the articles an agreement contains.
 * Each article includes a list of its parent sections.
 *
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {KaliData.AgreementArticleWithParentSections[]}
 */
function getAgreementArticlesWithParentSections(agreementIdOrIdcc) {
  const agreement = getAgreement(agreementIdOrIdcc);

  const articles =
    /** @type {{ children: KaliData.AgreementArticle[], type: "root" }} */
    (/** @type {*} */ (unistUtilFlatFilter(agreement, { type: "article" })));
  const articleIds = articles.children.map(({ data: { id } }) => id);

  const articlesWithParentSections = articleIds.reduce(
    (prevArticlesWithParentSections, articleId) => {
      try {
        const articleWithParentSections = getArticleWithParentSections(articleId);
        // console.log(articleWithParentSections);

        return [...prevArticlesWithParentSections, articleWithParentSections];
      } catch (err) {
        return prevArticlesWithParentSections;
      }
    },
    [],
  );

  return articlesWithParentSections;
}

module.exports = getAgreementArticlesWithParentSections;
