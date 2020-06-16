// @ts-check

/**
 * @param {string} articleId
 *
 * @returns {void}
 */
function checkArticleId(articleId) {
  if (typeof articleId !== "string" || !/^KALIARTI\d{12}$/.test(articleId)) {
    throw new Error(
      `<articleId> is malformed (${articleId}). ` +
        `It must be a valid article ID (string: "KALIARTI123456789012").`,
    );
  }
}

module.exports = checkArticleId;
