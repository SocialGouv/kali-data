// @ts-check

const path = require("path");

const getAgreementIdFromIdOrIdcc = require("../libs/getAgreementIdFromIdOrIdcc");
const getAgreements = require("./getAgreements");
const isFile = require("../helpers/isFile");

const INDEXED_AGREEMENTS = getAgreements();

/**
 * Check if an agreement is available.
 *
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {boolean}
 */
function hasAgreement(agreementIdOrIdcc) {
  try {
    const agreementId = getAgreementIdFromIdOrIdcc(agreementIdOrIdcc);
    const maybeFilePath = path.join(__dirname, `../../data/${agreementId}.json`);

    return (
      INDEXED_AGREEMENTS.find(({ id }) => id === agreementId) !== undefined && isFile(maybeFilePath)
    );
  } catch (err) {
    return false;
  }
}

module.exports = hasAgreement;
