const sortByIntOrdre = (a, b) => {
  if (a.intOrdre < b.intOrdre) {
    return -1;
  }
  if (a.intOrdre > b.intOrdre) {
    return 1;
  }
  return 0;
};

const numify = id => parseInt(id.replace(/^KALIARTI/, ""));

export const isValidSection = node =>
  !node.etat || (node.etat !== "ABROGE" && node.etat !== "PERIME");

// the API returns all the version of a given article. we pick the latest one
export const latestArticleVersionFilter = (currentArticle, index, articles) => {
  // dont filter out articles without cid
  if (!currentArticle.cid) {
    return true;
  }
  const maxVersion = Math.max(
    ...((articles && articles) || [])
      .filter(
        article =>
          article.cid === currentArticle.cid && article.id !== currentArticle.id
      )
      .map(article => numify(article.id)),
    0
  );
  return numify(currentArticle.id) > maxVersion;
};

// beware, this one is recursive for sections / articles !
export const filterData = node => ({
  id: node.id,
  cid: node.cid,
  num: node.num,
  intOrdre: node.intOrdre,

  title: node.title,
  content: node.content,
  ...(node.etat && { etat: node.etat }),
  // attributes related to containers
  ...(node.shortTitle && { shortTitle: node.shortTitle }),
  ...(node.categorisation && { categorisation: node.categorisation }),
  // attributes related to textes
  ...(node.dateParution && { dateParution: node.dateParution }),
  ...(node.surtitre && { surtitre: node.surtitre }),
  ...(node.historique && { historique: node.historique }),
  ...(node.modifDate && { modifDate: node.modifDate }),

  ...(node.articles &&
    node.articles.length && {
      articles: node.articles
        .filter(latestArticleVersionFilter)
        .map(filterData)
        .sort(sortByIntOrdre)
    }),
  ...(node.sections &&
    node.sections.length && {
      sections: node.sections
        .filter(isValidSection)
        .map(filterData)
        .sort(sortByIntOrdre)
    })
});
