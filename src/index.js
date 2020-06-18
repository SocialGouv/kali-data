// @ts-check

const getAgreement = require("./libs/getAgreement");
const getAgreementArticlesWithParentSections = require("./libs/getAgreementArticlesWithParentSections");
const getAgreements = require("./libs/getAgreements");
const getArticleWithParentSections = require("./libs/getArticleWithParentSections");
const getArticles = require("./libs/getArticles");
const getIndexedArticle = require("./libs/getIndexedArticle");
const hasAgreement = require("./libs/hasAgreement");
const hasArticle = require("./libs/hasArticle");

module.exports = {
  getAgreement,
  getAgreementArticlesWithParentSections,
  getAgreements,
  getArticleWithParentSections,
  getArticles,
  getIndexedArticle,
  hasAgreement,
  hasArticle,
};
