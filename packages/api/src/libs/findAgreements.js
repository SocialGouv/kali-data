// @ts-check

import { getAgreements } from "@socialgouv/kali-data";
import FuseJs from "fuse.js";

import cleanQuery from "../helpers/cleanQuery";

/**
 * @param {string=} query
 *
 * @returns {KaliData.IndexedAgreement[]}
 */
export default function findAgreements(query) {
  const indexedAgreements = getAgreements();

  if (query === undefined) {
    return indexedAgreements;
  }

  const cleanedQuery = cleanQuery(query);

  /** @type {Fuse.default.IFuseOptions<KaliData.IndexedAgreement>} */
  const fuseJsOptions = {
    distance: 999,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    isCaseSensitive: false,
    keys: ["title"],
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.5,
    useExtendedSearch: true,
  };

  const fuseJs = new FuseJs(indexedAgreements, fuseJsOptions);
  const foundAgreements =
    /** @type {Fuse.default.FuseResult<KaliData.IndexedAgreement>[]} */
    (fuseJs.search(cleanedQuery)).slice(0, 10).map(({ item }) => item);

  return foundAgreements;
}
