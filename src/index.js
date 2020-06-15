/// <reference path="./index.d.ts" />

// @ts-check

const getAgreement = require("./libs/getAgreement");
const getAgreementArticles = require("./libs/getAgreementArticles");
const getAgreements = require("./libs/getAgreements");
const getArticle = require("./libs/getArticle");
const getArticles = require("./libs/getArticles");
const hasAgreement = require("./libs/hasAgreement");

module.exports = {
  getAgreement,
  getAgreementArticles,
  getAgreements,
  getArticle,
  getArticles,
  hasAgreement,
};
