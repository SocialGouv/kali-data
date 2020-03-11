/*
 * Convert a DILA API structure made of metadata and sections|articles children to a [generic AST tree](https://github.com/syntax-tree/unist#nodes)
 */

// convert to syntax-tree format : flatten articles|sections in children
const astify = (node, depth = 0) => ({
  type: "section",
  data: {
    title: node.title,
    ...(depth === 0 && {
      title: node.titre,
      num: parseInt(node.num, 10),
      shortTitle: (node.categorisation && node.categorisation[0]) || node.title,
      categorisation: node.categorisation
    }),
    // add some data
    intOrdre: node.intOrdre,
    id: node.id,
    etat: node.etat,
    ...(node.modifDate && { modifDate: node.modifDate })
    // add more data when its the root container
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
