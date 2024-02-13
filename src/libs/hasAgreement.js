// @ts-check

const path = require("path");

const getAgreementIdFromIdOrIdcc = require("../libs/getAgreementIdFromIdOrIdcc");
const getAgreements = require("./getAgreements");
const isFile = require("../helpers/isFile");

/**
 * Check if an agreement is available.
 *
 * @param {number | string} agreementIdOrIdcc
 *
 * @returns {Promise<boolean>}
 */
async function hasAgreement(agreementIdOrIdcc) {
    try {
        const agreementId = await getAgreementIdFromIdOrIdcc(agreementIdOrIdcc);
        const maybeFilePath = path.join(__dirname, `../../data/${agreementId}.json`);
        const agreements = await getAgreements();

        return (
            agreements.find(({ id }) => id === agreementId) !== undefined && isFile(maybeFilePath)
        );
    } catch (err) {
        return false;
    }
}

module.exports = hasAgreement;
