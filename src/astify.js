/*
 * Convert a DILA API structure made of metadata and sections|articles children to a [generic AST tree](https://github.com/syntax-tree/unist#nodes)
 */

// convert to syntax-tree format : flatten articles|sections in children
const astify = (node, depth = 0) => ({
  type: "section",
  data: {
    // add some data
    intOrdre: node.intOrdre,
    title: node.title,
    id: node.id,
    etat: node.etat,
    // add more data when its the root container
    ...(depth === 0 && {
      num: node.num,
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

module.exports = astify;
