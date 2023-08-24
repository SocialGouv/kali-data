// @ts-check

const unistUtilParents = require("unist-util-parents");

const getAgreementIdFromIdOrIdcc = require("../libs/getAgreementIdFromIdOrIdcc");
const hasAgreement = require("./hasAgreement");

/**
 * Get a full agreement unist tree with its sections and articles.
 *
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {KaliData.Agreement}
 */
function getAgreement(agreementIdOrIdcc) {
    const agreementId = getAgreementIdFromIdOrIdcc(agreementIdOrIdcc);
    if (!hasAgreement(agreementId)) {
        throw new Error(`No agreement found with this ID (${agreementId}).`);
    }

    const agreement = require(`../../data/${agreementId}.json`);
    const agreementWithParents = unistUtilParents(agreement);

    return agreementWithParents;
}

module.exports = getAgreement;
