// @ts-check

/**
 * Generate an articles index matching articles ID & CID with their agreement ID.
 */

import fs from "fs";
import log from "npmlog";
import path from "path";
import unistUtilFlatFilter from "unist-util-flat-filter";

import { getAgreement, getAgreements } from "../src";
import getArticlePath from "./helpers/getArticlePath";

log.enableColor();

async function main() {
    log.info("match()", `Indexing articles…`);
    const agreementsIndex = await getAgreements();

    const articlesIndex = [];
    for (const { id: agreementId } of agreementsIndex) {
        if (/-\d+$/.test(agreementId)) {
            continue;
        }
        console.warn("getAgreement", agreementId);

        const agreement = await getAgreement(agreementId);
        const agreementWithFlatArticles =
            /** @type {{ type: "root", children: KaliData.AgreementArticle }} */
            (unistUtilFlatFilter(agreement, "article"));
        if (
            agreementWithFlatArticles === null ||
            !Array.isArray(agreementWithFlatArticles.children)
        ) {
            continue;
        }

        const agreementArticles = agreementWithFlatArticles.children.map(
            ({ data: { cid: articleCid, id: articleId } }) => ({
                agreementId,
                articleCid,
                articleId,
                path: getArticlePath(agreement, articleCid),
            }),
        );

        articlesIndex.push.apply(articlesIndex, agreementArticles);
    }

    const articlesIndexFilePath = path.join(__dirname, "..", "data", "articles", "index.json");
    log.info("match()", `Writing ${articlesIndexFilePath}…`);
    fs.writeFileSync(articlesIndexFilePath, JSON.stringify(articlesIndex, null, 2));
}

main().catch(error => {
    log.error("match()", `Failed: ${error}`);

    process.exit(-1);
});
