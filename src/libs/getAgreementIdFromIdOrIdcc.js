// @ts-check

const getAgreements = require("../libs/getAgreements");

const INDEXED_AGREEMENTS = getAgreements();

/**
 * @param {number | string} idcc
 *
 * @returns {boolean}
 */
const isAgreementIdcc = idcc =>
  typeof idcc === "number" || (typeof idcc === "string" && /^\d{4}$/.test(idcc));

/**
 * @param {string} id
 *
 * @returns {boolean}
 */
const isAgreementId = id => typeof id === "string" && /^KALICONT\d{12}$/.test(id);

/**
 * Convert any agreement ID or IDCC into a normalized agreement IDCC.
 *
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {string}
 */
function getAgreementIdFromIdOrIdcc(agreementIdOrIdcc) {
  if (isAgreementIdcc(agreementIdOrIdcc)) {
    const idcc = Number(agreementIdOrIdcc);
    const matchIdcc = ({ num }) => num === idcc;
    const maybeAgreement = INDEXED_AGREEMENTS.find(matchIdcc);
    if (maybeAgreement === undefined) {
      throw new Error(`No agreement found with this IDCC (${idcc}).`);
    }

    return maybeAgreement.id;
  }

  if (typeof agreementIdOrIdcc !== "number" && isAgreementId(agreementIdOrIdcc)) {
    const agreementId = agreementIdOrIdcc;

    return agreementId;
  }

  throw new Error(
    `<agreementIdOrIdcc> is malformed (${agreementIdOrIdcc}). ` +
      `It must be a valid agreement IDCC (string | number) or ID (string: "KALICONT123456789012").`,
  );
}

module.exports = getAgreementIdFromIdOrIdcc;
