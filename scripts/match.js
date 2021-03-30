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

log.info("match()", `Indexing articles…`);
const agreementsIndex = getAgreements();

const articlesIndex = agreementsIndex.flatMap(({ id: agreementId }) => {
  if (/-\d+$/.test(agreementId)) {
    return [];
  }
  console.warn("getAgreement", agreementId);

  const agreement = getAgreement(agreementId);
  const agreementWithFlatArticles =
    /** @type {{ type: "root", children: KaliData.AgreementArticle }} */
    (unistUtilFlatFilter(agreement, "article"));
  if (agreementWithFlatArticles === null || !Array.isArray(agreementWithFlatArticles.children)) {
    return [];
  }

  const agreementArticles = agreementWithFlatArticles.children.map(
    ({ data: { cid: articleCid, id: articleId } }) => ({
      agreementId,
      articleCid,
      articleId,
      path: getArticlePath(agreement, articleCid),
    }),
  );

  return agreementArticles;
});

const articlesIndexFilePath = path.join(__dirname, "..", "data", "articles", "index.json");
log.info("match()", `Writing ${articlesIndexFilePath}…`);
fs.writeFileSync(articlesIndexFilePath, JSON.stringify(articlesIndex, null, 2));
