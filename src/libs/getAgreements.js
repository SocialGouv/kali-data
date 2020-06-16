// @ts-check

const INDEXED_AGREEMENTS =
  /** @type {KaliData.IndexedAgreement[]} */
  (require("../../data/index.json"));

/**
 * @returns {KaliData.IndexedAgreement[]}
 */
function getAgreements() {
  return INDEXED_AGREEMENTS;
}

module.exports = getAgreements;
