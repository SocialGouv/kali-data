/*
 * Convert a DILA API structure made of metadata and sections|articles children to a [generic AST tree](https://github.com/syntax-tree/unist#nodes)
 */

import normalizeIdcc from "./normalizeIdcc";

// convert to syntax-tree format : flatten articles|sections in children
const astify = (node, depth = 0) => ({
  type: "section",
  data: {
    // add some data
    intOrdre: node.intOrdre,
    title: node.title,
    id: node.id,
    etat: node.etat,
    ...(node.modifDate && { modifDate: node.modifDate }),
    // add more data when its the root container
    ...(depth === 0 && {
      num: parseInt(node.num, 10),
      shortTitle: node.shortTitle,
      categorisation: node.categorisation
    })
  },
  children: [
    ...((node.sections && node.sections.map(node => astify(node, depth + 1))) ||
      []),
    ...((node.articles &&
      node.articles.map(article => ({
        type: "article",
        data: article
      }))) ||
      [])
  ]
});

export default astify;
