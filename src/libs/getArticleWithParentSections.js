// @ts-check
/**
 * @typedef AgreementArticleWithParent
 * @property {"article"} type
 * @property {KaliData.AgreementArticleData} data
 * @property {AgreementSectionWithParent} parent
 *
 * @typedef AgreementSectionWithParent
 * @property {"section"} type
 * @property {KaliData.AgreementSectionData} data
 * @property {KaliData.AgreementArticle[]} children
 * @property {AgreementSectionWithParent} parent
 */

const unistUtilFind = require("unist-util-find");

const getAgreement = require("./getAgreement");
const getIndexedArticle = require("./getIndexedArticle");

/**
 * @param {KaliData.Agreement} agreement
 * @param {Partial<KaliData.AgreementArticleData>} data
 *
 * @returns {AgreementArticleWithParent=}
 */
const findArticleWithData = (agreement, data) =>
    unistUtilFind(agreement, {
        data,
        type: "article",
    });

/**
 * @param {AgreementArticleWithParent} article
 *
 * @returns {KaliData.AgreementArticleWithParentSections["sections"]}
 */
const getParentSectionsFromArticle = article => {
    const sections = [];
    let section = article.parent;

    while (section) {
        const { data, type } = section;
        sections.unshift({ data, type });

        section = section.parent;
    }

    return sections;
};

/**
 * Get an agreement article unist node with its parent sections.
 *
 * @param {string} articleIdOrCid
 *
 * @returns {KaliData.AgreementArticleWithParentSections}
 *
 * @deprecated Use `getArticleWithPath()` instead.
 */
function getArticleWithParentSections(articleIdOrCid) {
    const { agreementId } = getIndexedArticle(articleIdOrCid);
    const agreement = getAgreement(agreementId);

    // First attempt with an article ID:
    const maybeArticleWithId = findArticleWithData(agreement, { id: articleIdOrCid });
    if (maybeArticleWithId !== undefined) {
        /** @type {KaliData.AgreementArticleWithParentSections} */
        const articleWithParentSections = {
            ...maybeArticleWithId,
            sections: getParentSectionsFromArticle(maybeArticleWithId),
        };

        return articleWithParentSections;
    }

    // Second attempt with an article CID:
    const maybeArticleWithCid = findArticleWithData(agreement, { cid: articleIdOrCid });
    if (maybeArticleWithCid === undefined) {
        throw new Error(`No agreement article found with this ID or CID (${articleIdOrCid}).`);
    }

    /** @type {KaliData.AgreementArticleWithParentSections} */
    const articleWithParentSections = {
        ...maybeArticleWithCid,
        sections: getParentSectionsFromArticle(maybeArticleWithCid),
    };

    return articleWithParentSections;
}

module.exports = getArticleWithParentSections;
