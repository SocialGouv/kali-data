// @ts-check

const getAgreements = require("../libs/getAgreements");

const INDEXED_AGREEMENTS = getAgreements();

/**
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {string}
 */
function getAgreementIdFromIdOrIdcc(agreementIdOrIdcc) {
  if (
    typeof agreementIdOrIdcc === "number" ||
    (typeof agreementIdOrIdcc === "string" && /^\d{4}$/.test(agreementIdOrIdcc))
  ) {
    const idcc = Number(agreementIdOrIdcc);
    const maybeAgreement = INDEXED_AGREEMENTS.find(({ num }) => num === idcc);
    if (maybeAgreement === undefined) {
      throw new Error(`No agreement found with this IDCC (${idcc}).`);
    }

    return maybeAgreement.id;
  }

  if (typeof agreementIdOrIdcc === "string" && /^KALICONT\d{12}$/.test(agreementIdOrIdcc)) {
    const agreementId = agreementIdOrIdcc;

    return agreementId;
  }

  throw new Error(
    `<agreementIdOrIdcc> is malformed (${agreementIdOrIdcc}). ` +
      `It must be a valid agreement IDCC (string | number) or ID (string: "KALICONT123456789012").`,
  );
}

module.exports = getAgreementIdFromIdOrIdcc;
