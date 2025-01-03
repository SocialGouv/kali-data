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
    const containsId = convention => typeof convention.id === "string";

    return INDEXED_AGREEMENTS.filter(containsId);
}

module.exports = getAgreements;
