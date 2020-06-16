// @ts-check

import log from "npmlog";
import unistUtilFind from "unist-util-find";

import { getAgreement, getAgreements } from "../src";

log.enableColor();
const INDEXED_AGREEMENTS = getAgreements();

/**
 * @param {KaliData.IndexedAgreement} convention
 *
 * @returns {boolean}
 */
const containsUrl = convention => typeof convention.url === "string";

/**
 * @param {KaliData.AgreementArticle | KaliData.AgreementSection} node
 *
 * @returns {boolean}
 */
const hasSectionWithNoChild = node =>
  node.type === "section" && Array.isArray(node.children) && node.children.length === 0;

const agrementsWithUrl = INDEXED_AGREEMENTS.filter(containsUrl);
agrementsWithUrl.forEach(({ id }) => {
  const agreement = getAgreement(id);
  const agreementAdditionalSections = agreement.children.slice(1);
  const emptyNodes = unistUtilFind(agreementAdditionalSections, hasSectionWithNoChild);

  if (emptyNodes !== undefined) {
    log.error("check()", `${id} has ${emptyNodes.length} empty nodes.`);

    process.exit(-1);
  }
});
