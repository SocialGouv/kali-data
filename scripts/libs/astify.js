/*
 * Convert a DILA API structure made of metadata and sections|articles children to a [generic AST tree](https://github.com/syntax-tree/unist#nodes)
 */

// convert to syntax-tree format : flatten articles|sections in children
const astify = (node, depth = 0) => ({
  children: [
    ...((node.sections &&
      node.sections.filter(latestVersionFilter).map(node => astify(node, depth + 1))) ||
      []),
    ...((node.articles &&
      node.articles.filter(latestVersionFilter).map(article => ({
        data: article,
        type: "article",
      }))) ||
      []),
  ],
  data: {
    title: node.title,

    ...(depth === 0 && {
      categorisation: node.categorisation,
      num: parseInt(node.num, 10),
      shortTitle: (node.categorisation && node.categorisation[0]) || node.title,
      title: node.titre,
    }),

    ...(depth > 0 && { cid: node.cid }),
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    etat: node.etat,
    id: node.id,
    // add some data
    intOrdre: node.intOrdre,
    ...(node.modifDate && { modifDate: node.modifDate }),
    // add more data when its the root container
  },
  type: depth === 0 ? "convention collective" : "section",
});

const numify = id => parseInt(id.replace(/^KALI(ARTI|SCTA|TEXT)/, ""));

export const isValidSection = node => {
  return (node.etat || node.jurisState || "").startsWith("VIGUEUR");
};

// the API returns all the version of a given article. we pick the latest one
export const latestVersionFilter = (currentArticle, _, articles) => {
  // dont filter out articles without cid
  if (!currentArticle.cid) {
    return true;
  }
  // skip Texte de base
  if (currentArticle.intOrdre === 0) {
    return true;
  }
  const maxVersion = Math.max(
    ...((articles && articles) || [])
      .filter(article => article.cid === currentArticle.cid && article.id !== currentArticle.id)
      .map(article => numify(article.id)),
    0,
  );

  return numify(currentArticle.id) > maxVersion;
};

export default astify;
