// @ts-check

import { getAgreement } from "@socialgouv/kali-data";

/**
 * @param {number | string} idOrIdcc
 *
 * @returns {KaliData.Agreement}
 */
export default function getAgreementByIdOrIdcc(idOrIdcc) {
  return getAgreement(idOrIdcc);
}
