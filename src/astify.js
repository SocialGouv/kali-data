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
      categorisation: node.categorisation,
    }),
    // add some data
    intOrdre: node.intOrdre,
    id: node.id,
    etat: node.etat,
    ...(node.modifDate && { modifDate: node.modifDate }),
    // add more data when its the root container
  },
  children: [
    ...((node.sections &&
      node.sections.map((node) => astify(node, depth + 1))) ||
      []),
    ...((node.articles &&
      node.articles.filter(latestArticleVersionFilter).map((article) => ({
        type: "article",
        data: article,
      }))) ||
      []),
  ],
});

const numify = (id) => parseInt(id.replace(/^KALIARTI/, ""));

export const isValidSection = (node) =>
  !node.etat || node.etat.startsWith("VIGUEUR");

// the API returns all the version of a given article. we pick the latest one
export const latestArticleVersionFilter = (currentArticle, _, articles) => {
  // dont filter out articles without cid
  if (!currentArticle.cid) {
    return true;
  }
  const maxVersion = Math.max(
    ...((articles && articles) || [])
      .filter(
        (article) =>
          article.cid === currentArticle.cid && article.id !== currentArticle.id
      )
      .map((article) => numify(article.id)),
    0
  );
  return numify(currentArticle.id) > maxVersion;
};

export default astify;
