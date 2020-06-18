// @ts-check

/**
 * @param {KaliData.AgreementSection | KaliData.AgreementArticle} sectionA
 * @param {KaliData.AgreementSection | KaliData.AgreementArticle} sectionB
 *
 * @returns {number}
 */
export default function sortByIntOrdre(sectionA, sectionB) {
  if (sectionA.data.intOrdre === sectionB.data.intOrdre) {
    return (
      Number(sectionA.data.id.replace(/[^0-9]+/g, "")) -
      Number(sectionB.data.id.replace(/[^0-9]+/g, ""))
    );
  }

  return sectionA.data.intOrdre - sectionB.data.intOrdre;
}
