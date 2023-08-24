// @ts-check

/**
 * @param {string} articleIdOrCid
 *
 * @returns {void}
 */
function checkArticleIdOrCid(articleIdOrCid) {
    if (typeof articleIdOrCid !== "string" || !/^KALIARTI\d{12}$/.test(articleIdOrCid)) {
        throw new Error(
            `<articleIdOrCid> is malformed (${articleIdOrCid}). ` +
                `It must be a valid article ID or CID (string: "KALIARTI123456789012").`,
        );
    }
}

module.exports = checkArticleIdOrCid;
