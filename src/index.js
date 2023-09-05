// @ts-check

const getAgreement = require("./libs/getAgreement");
const getAgreementArticlesWithParentSections = require("./libs/getAgreementArticlesWithParentSections");
const getAgreementArticlesWithPath = require("./libs/getAgreementArticlesWithPath");
const getAgreements = require("./libs/getAgreements");
const getArticleWithParentSections = require("./libs/getArticleWithParentSections");
const getArticleWithPath = require("./libs/getArticleWithPath");
const getAgreementIdFromIdOrIdcc = require("./libs/getAgreementIdFromIdOrIdcc");
const getArticles = require("./libs/getArticles");
const getIndexedArticle = require("./libs/getIndexedArticle");
const hasAgreement = require("./libs/hasAgreement");
const hasArticle = require("./libs/hasArticle");
const getAgreementsWithNoId = require("./libs/getAgreementsWithNoId");

module.exports = {
    getAgreement,
    getAgreementArticlesWithParentSections,
    getAgreementArticlesWithPath,
    getAgreementIdFromIdOrIdcc,
    getAgreements,
    getAgreementsWithNoId,
    getArticleWithParentSections,
    getArticleWithPath,
    getArticles,
    getIndexedArticle,
    hasAgreement,
    hasArticle,
};
