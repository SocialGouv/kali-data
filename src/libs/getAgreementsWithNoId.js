// @ts-check

const INDEXED_AGREEMENTS =
    /** @type {KaliData.IndexedAgreement[]} */
    (require("../../data/index.json"));

/**
 * Get the full list of indexed agreements.
 *
 * @returns {KaliData.IndexedAgreement[]}
 */
function getAgreementsWithNoId() {
    const containsNoId = convention => typeof convention.id === "undefined";

    return INDEXED_AGREEMENTS.filter(containsNoId);
}

module.exports = getAgreementsWithNoId;
