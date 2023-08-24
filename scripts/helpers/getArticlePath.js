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
 * @returns {string[]}
 */
const generateParentSectionsPath = article => {
    const path = [];
    let section = article.parent;

    while (section) {
        const {
            data: { title },
        } = section;
        if (title) {
            path.unshift(title.trim());
        }
        section = section.parent;
    }

    // Remove the useless first section since it's always the agreement title:
    path.shift();

    return path;
};

/**
 * @param {KaliData.Agreement} agreement
 * @param {string} articleCid
 *
 * @returns {string[]}
 */
function getArticlePath(agreement, articleCid) {
    const maybeArticleWithCid = findArticleWithData(agreement, { cid: articleCid });
    if (maybeArticleWithCid === undefined) {
        throw new Error(`No agreement article found with this CID (${articleCid}).`);
    }

    // Fill the path with the ordered sections' title:
    const path = generateParentSectionsPath(maybeArticleWithCid);

    // Attempt to normalize main text titles:
    if (/^texte de base/i.test(path[0].trim())) {
        path[0] = "Texte de base";
    }

    // Add a normalized article title to the path if the article is explicitely indexed:
    const {
        data: { num },
    } = maybeArticleWithCid;
    if (num !== undefined) {
        path.push(`Article ${(num && num.trim()) || ""}`);
    }

    return path;
}

module.exports = getArticlePath;
