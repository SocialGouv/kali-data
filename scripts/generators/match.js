// @ts-check

/**
 * Generate an articles index matching articles ID with their agreement ID.
 */

import fs from "fs";
import log from "npmlog";
import path from "path";
import unistUtilFlatFilter from "unist-util-flat-filter";

import { getAgreement, getAgreements } from "../..";

log.enableColor();

log.info("match()", `Indexing articles…`);
const agreementsIndex = getAgreements();
const articlesIndex = agreementsIndex.reduce((prevArticlesIndex, { id: agreementId }) => {
  if (/-\d+$/.test(agreementId)) {
    return prevArticlesIndex;
  }

  const agreementTree = getAgreement(agreementId);
  const agreementTreeWithFlatArticles =
    /** @type {KaliData.AgreementSection} */
    (unistUtilFlatFilter(agreementTree, "article"));
  if (
    agreementTreeWithFlatArticles === null ||
    !Array.isArray(agreementTreeWithFlatArticles.children)
  ) {
    return prevArticlesIndex;
  }

  const newArticlesIndex = agreementTreeWithFlatArticles.children.map(
    ({ data: { id: articleId } }) => ({
      agreementId,
      articleId,
    }),
  );

  return [...prevArticlesIndex, ...newArticlesIndex];
}, []);

const articlesIndexFilePath = path.join(__dirname, "../../data/articles/index.json");
log.info("match()", `Writing ${articlesIndexFilePath}…`);
fs.writeFileSync(articlesIndexFilePath, JSON.stringify(articlesIndex, null, 2));
