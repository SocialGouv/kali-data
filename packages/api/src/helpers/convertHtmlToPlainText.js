// @ts-check

import htmlToText from "html-to-text";

// https://github.com/werk85/node-html-to-text#options
const HTML_TO_TEXT_OPTIONS = {
  ignoreHref: true,
  ignoreImage: true,
  wordwrap: 9999,
};

/**
 * @param {string} source
 *
 * @returns {string}
 */
export default function convertHtmlToPlainText(source) {
  return htmlToText
    .fromString(source, HTML_TO_TEXT_OPTIONS)
    .trim()
    .replace(/\n{3,}/g, "\n\n");
}
