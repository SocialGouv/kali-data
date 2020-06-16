/// <reference path="./index.d.ts" />

// @ts-check

const getAgreement = require("./libs/getAgreement");
const getAgreementArticlesithParentSections = require("./libs/getAgreementArticlesithParentSections");
const getAgreements = require("./libs/getAgreements");
const getArticleWithParentSections = require("./libs/getArticleWithParentSections");
const getArticles = require("./libs/getArticles");
const hasAgreement = require("./libs/hasAgreement");

module.exports = {
  getAgreement,
  getAgreementArticlesithParentSections,
  getAgreements,
  getArticleWithParentSections,
  getArticles,
  hasAgreement,
};
