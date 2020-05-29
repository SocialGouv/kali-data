// @ts-check

import { getAgreement, getAgreementArticles } from "@socialgouv/kali-data";

import cache from "../helpers/cache";
import convertHtmlToPlainText from "../helpers/convertHtmlToPlainText";
import ApiError from "./ApiError";

const CACHE_TTL = 24 * 60 * 60; // => 24h

/**
 * @param {KaliData.AgreementArticleWithSections["sections"]} sections
 * @param {string=} num Article Index
 *
 * @returns {string}
 */
function generatePath(sections, num) {
  const pathChunks = sections
    .map(({ data: { title } }) => title)
    .filter(title => typeof title === "string" && title.trim().length !== 0)
    .map(title => title.trim().replace(/\s+/g, " "));

  if (typeof num === "string") {
    pathChunks.push(`Article ${num}`);
  }

  const path = pathChunks.join(" » ");

  return path;
}

/**
 * @param {string} agreementIdOrIdcc
 *
 * @returns {Api.EnrichedArticle[]}
 */
export default function getEnrichedAgreementsArticles(agreementIdOrIdcc) {
  try {
    const agreement = getAgreement(agreementIdOrIdcc);
    const cacheKey = agreement.data.id;

    // Return cached enriched articles if available for this agreement:
    const maybeCachedEnrichedArticles = cache.get(cacheKey);
    if (maybeCachedEnrichedArticles !== undefined) {
      return maybeCachedEnrichedArticles;
    }

    const articles = getAgreementArticles(agreementIdOrIdcc);

    /** @type {Api.EnrichedArticle[]} */
    const enrichedArticles = articles.map(({ data, sections }) => ({
      ...data,
      content: convertHtmlToPlainText(data.content),
      path: generatePath(sections, data.num),
    }));

    cache.set(cacheKey, enrichedArticles, CACHE_TTL);

    return enrichedArticles;
  } catch (err) {
    throw new ApiError(err.message, 500, "libs/getEnrichedAgreementsArticles()");
  }
}
