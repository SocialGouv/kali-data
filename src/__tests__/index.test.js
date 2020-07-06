import fs from "fs";
import path from "path";

import kaliData from "../..";

test(`@socialgouv/kali-data`, () => {
  const libNames = fs
    .readdirSync(path.join(__dirname, "../libs"))
    .filter(name => name !== "__tests__");

  expect(Object.keys(kaliData)).toHaveLength(libNames.length);

  expect(kaliData.getAgreement).toBeInstanceOf(Function);
  expect(kaliData.getAgreementArticlesWithParentSections).toBeInstanceOf(Function);
  expect(kaliData.getAgreementArticlesWithPath).toBeInstanceOf(Function);
  expect(kaliData.getAgreementIdFromIdOrIdcc).toBeInstanceOf(Function);
  expect(kaliData.getAgreements).toBeInstanceOf(Function);
  expect(kaliData.getArticleWithParentSections).toBeInstanceOf(Function);
  expect(kaliData.getArticleWithPath).toBeInstanceOf(Function);
  expect(kaliData.getArticles).toBeInstanceOf(Function);
  expect(kaliData.getIndexedArticle).toBeInstanceOf(Function);
  expect(kaliData.hasAgreement).toBeInstanceOf(Function);
  expect(kaliData.hasArticle).toBeInstanceOf(Function);
});
