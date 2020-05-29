// @ts-check

/** @type {typeof Fuse.default} */
import FuseJs from "fuse.js";

import cleanQuery from "../helpers/cleanQuery";
import smartenArticleQuery from "../helpers/smartenArticleQuery";
import getEnrichedAgreementsArticles from "./getEnrichedAgreementsArticles";

/**
 * @param {string} agreementIdOrIdcc
 * @param {string} query
 *
 * @returns {Api.EnrichedArticle[]}
 *
 * TODO Extract query cleaning into a separate helper.
 */
export default function findArticles(agreementIdOrIdcc, query) {
  const articles = getEnrichedAgreementsArticles(agreementIdOrIdcc);
  const cleanedQuery = cleanQuery(query);
  const smartQuery = smartenArticleQuery(cleanedQuery);

  /** @type {Fuse.default.IFuseOptions<Api.EnrichedArticle>} */
  const fuseJsOptions = {
    distance: 999,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    isCaseSensitive: false,
    keys: ["path"],
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.5,
    useExtendedSearch: true,
  };

  const fuseJs = new FuseJs(articles, fuseJsOptions);
  const foundArticles =
    /** @type {Fuse.default.FuseResult<Api.EnrichedArticle>[]} */
    (fuseJs.search(smartQuery)).slice(0, 10).map(({ item }) => item);

  return foundArticles;
}
