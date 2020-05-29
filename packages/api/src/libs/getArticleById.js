// @ts-check

import { getArticle } from "@socialgouv/kali-data";

/**
 * @param {string} articleId
 *
 * @returns {?KaliData.AgreementArticleWithSections}
 */
export default function getArticleById(articleId) {
  return getArticle(articleId);
}
