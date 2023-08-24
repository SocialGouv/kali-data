// @ts-check

const INDEXED_AGREEMENTS =
    /** @type {KaliData.IndexedAgreement[]} */
    (require("../../data/index.json"));

/**
 * Get the full list of indexed agreements.
 *
 * @returns {KaliData.IndexedAgreement[]}
 */
function getAgreements() {
    return INDEXED_AGREEMENTS;
}

module.exports = getAgreements;
