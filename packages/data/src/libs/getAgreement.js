// @ts-check

const unistUtilParents = require("unist-util-parents");

const getAgreementIdFromIdOrIdcc = require("../helpers/getAgreementIdFromIdOrIdcc");
const hasAgreement = require("./hasAgreement");

/**
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {KaliData.Agreement}
 */
function getAgreement(agreementIdOrIdcc) {
  const agreementId = getAgreementIdFromIdOrIdcc(agreementIdOrIdcc);
  if (!hasAgreement(agreementId)) {
    throw new Error(`No agreement found with this ID (${agreementId}).`);
  }

  const agreement = require(`../../agreements/${agreementId}.json`);
  const agreementWithParents = unistUtilParents(agreement);

  return agreementWithParents;
}

module.exports = getAgreement;
