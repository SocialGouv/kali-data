// @ts-check

import log from "npmlog";
import unistUtilFind from "unist-util-find";

import { getAgreement, getAgreements } from "../src";

log.enableColor();

async function main() {
    const agreements = await getAgreements();

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

    const agrementsWithUrl = agreements.filter(containsUrl);
    for (const { id } of agrementsWithUrl) {
        const agreement = await getAgreement(id);
        const agreementAdditionalSections = agreement.children.slice(1);
        const emptyNodes = unistUtilFind(agreementAdditionalSections, hasSectionWithNoChild);

        if (emptyNodes !== undefined) {
            log.error("check()", `${id} has ${emptyNodes.length} empty nodes.`);

            process.exit(-1);
        }
    }
}

main().catch(error => {
    log.error("check()", `Failed: ${error}`);
    console.error(error);

    process.exit(-1);
});
