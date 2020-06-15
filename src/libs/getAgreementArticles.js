// @ts-check

const unistUtilFlatFilter = require("unist-util-flat-filter");

const getAgreement = require("./getAgreement");
const getArticle = require("./getArticle");

/**
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {KaliData.AgreementArticleWithSections[]}
 */
function getAgreementArticles(agreementIdOrIdcc) {
  const agreement = getAgreement(agreementIdOrIdcc);

  const articles =
    /** @type {{ children: KaliData.AgreementArticle[], type: "root" }} */
    (/** @type {*} */ (unistUtilFlatFilter(agreement, { type: "article" })));
  const articleIds = articles.children.map(({ data: { id } }) => id);

  const articlesWithSections = articleIds.reduce((prevArticlesWithSections, articleId) => {
    try {
      const articleWithSections = getArticle(articleId);
      // console.log(articleWithSections);

      return [...prevArticlesWithSections, articleWithSections];
    } catch (err) {
      return prevArticlesWithSections;
    }
  }, []);

  return articlesWithSections;
}

module.exports = getAgreementArticles;
